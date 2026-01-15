export const trackEvent = (goal: string, params?: any) => {
    if (typeof window !== 'undefined' && (window as any).ym) {
        const METRICA_ID = process.env.NEXT_PUBLIC_YANDEX_METRICA || '99602444';
        (window as any).ym(METRICA_ID, 'reachGoal', goal, params);
        console.log(`[Analytics] Goal reached: ${goal}`, params);
    }
};

export const SEO_GOALS = {
    SEARCH_USED: 'search_used',
    HADITH_SHARED: 'hadith_shared',
    HADITH_COPIED: 'hadith_copied',
    LANG_SWITCHED: 'lang_switched',
    BOOKMARK_ADDED: 'bookmark_added',
};
