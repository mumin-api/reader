'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

const METRICA_ID = process.env.NEXT_PUBLIC_YANDEX_METRICA || '99602444'; // Example ID

export const Analytics = () => {
    const pathname = usePathname();

    useEffect(() => {
        // Track page views on route change
        if (typeof window !== 'undefined' && (window as any).ym) {
            (window as any).ym(METRICA_ID, 'hit', pathname);
        }
    }, [pathname]);

    return (
        <>
            <Script id="yandex-metrica" strategy="afterInteractive">
                {`
                    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                    m[i].l=1*new Date();
                    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                    ym(${METRICA_ID}, "init", {
                        clickmap:true,
                        trackLinks:true,
                        accurateTrackBounce:true,
                        webvisor:true
                    });
                `}
            </Script>
        </>
    );
};
