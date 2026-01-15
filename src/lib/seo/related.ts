import { hadithApi, Hadith } from '../api/client';

// Simple LRU-like cache for server-side
const RELATED_CACHE = new Map<number, { data: Hadith[], timestamp: number }>();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

export async function getRelatedHadiths(hadith: Hadith, locale: string = 'en'): Promise<Hadith[]> {
    const cacheKey = hadith.id;
    const cached = RELATED_CACHE.get(cacheKey);

    if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
        return cached.data;
    }

    const { collection, translation, arabicNarrator } = hadith;
    const narratorName = translation?.narrator || '';

    // 1. Fetch potential candidates
    // We try to find hadiths by narrator and keywords
    const keywords = translation?.text.split(' ').slice(0, 5).join(' ') || '';

    try {
        const [byNarrator, byKeywords] = await Promise.all([
            narratorName ? hadithApi.searchHadiths({ q: narratorName, language: locale, limit: 10 }) : Promise.resolve({ data: [] }),
            keywords ? hadithApi.searchHadiths({ q: keywords, language: locale, limit: 10 }) : Promise.resolve({ data: [] })
        ]);

        const candidates = [...(byNarrator.data || byNarrator), ...(byKeywords.data || byKeywords)];

        // 2. Score candidates
        const scored = candidates
            .filter(h => h.id !== hadith.id) // Remove self
            .map(h => {
                let score = 0;

                // Narrator Match (0.2)
                if (h.translation?.narrator === narratorName) score += 0.2;

                // Collection Proximity (0.3)
                if (h.collection === collection) {
                    score += 0.3;
                    // Extra for being close in number
                    const diff = Math.abs(h.hadithNumber - hadith.hadithNumber);
                    if (diff < 10) score += 0.1;
                }

                // Topic Match (0.5) - Rudimentary via keywords for now
                // In a real system, we'd have topic IDs
                const hText = h.translation?.text || '';
                const sharedWords = keywords.split(' ').filter(w => hText.includes(w)).length;
                score += (sharedWords / 5) * 0.5;

                return { hadith: h, score };
            });

        // 3. Filter and Sort
        const results = scored
            .filter(s => s.score >= 0.3)
            .sort((a, b) => b.score - a.score)
            .slice(0, 4)
            .map(s => s.hadith);

        // Fallback: If not enough results, get popular/random from same collection
        if (results.length < 3) {
            const fallback = await hadithApi.getHadiths({ collection, limit: 5, language: locale });
            const fallbackData = fallback.data || fallback;
            results.push(...fallbackData.filter((f: Hadith) => f.id !== hadith.id && !results.find(r => r.id === f.id)));
        }

        const finalResults = results.slice(0, 4);

        // Update Cache
        RELATED_CACHE.set(cacheKey, { data: finalResults, timestamp: Date.now() });

        return finalResults;
    } catch (err) {
        console.error('Error in Related Hadiths Algorithm:', err);
        return [];
    }
}
