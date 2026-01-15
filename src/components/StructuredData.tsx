import React from 'react';

interface StructuredDataProps {
    data: Record<string, any>;
}

export const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
};

export const generateHadithSchema = (hadith: any, url: string) => {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": `Hadith ${hadith.hadithNumber} - ${hadith.collection}`,
        "alternativeHeadline": hadith.arabicNarrator || "Prophetic Tradition",
        "image": `${url}/api/og?id=${hadith.id}`,
        "author": {
            "@type": "Person",
            "name": hadith.arabicNarrator || "Prophetic Wisdom"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Mumin Hadith Reader",
            "logo": {
                "@type": "ImageObject",
                "url": `${url}/icons/logo.png`
            }
        },
        "url": `${url}/hadith/${hadith.id}`,
        "datePublished": "2026-01-13", // Static for now, or use hadith added date
        "description": hadith.translation?.text?.substring(0, 160) || "Read and study authentic hadith from classical collections.",
        "articleBody": hadith.translation?.text || hadith.arabicText,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${url}/hadith/${hadith.id}`
        }
    };
};

export const generateBreadcrumbSchema = (items: { name: string; item: string }[]) => {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.item
        }))
    };
};

export const generateSearchSchema = (url: string) => {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": url,
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${url}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
        }
    };
};
