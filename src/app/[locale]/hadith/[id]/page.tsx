import { redirect, notFound } from 'next/navigation';
import { hadithApi } from '@/lib/api/client';
import { getCollectionSlug } from '@/lib/utils';

export default async function HadithRedirectPage({ params }: { params: Promise<{ locale: string, id: string }> }) {
    const { locale, id } = await params;
    const hadithId = parseInt(id);

    if (!hadithId) {
        redirect(`/${locale}`);
    }

    try {
        const hadith = await hadithApi.getHadithById(hadithId);
        if (hadith) {
            const slug = getCollectionSlug(hadith.collection);
            redirect(`/${locale}/collections/${slug}/${hadith.hadithNumber}`);
        } else {
            notFound();
        }
    } catch (err) {
        console.error('Redirect failed on server', err);
        redirect(`/${locale}`);
    }
}
