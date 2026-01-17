
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

async function getHadith(id: string) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';
        const apiKey = process.env.API_KEY || 'sk_mumin_test_key_1234567890abcdef12345678';

        const res = await fetch(`${baseUrl}/hadiths/${id}?language=en`, {
            headers: {
                'X-API-Key': apiKey,
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            console.error(`OG Image Fetch Error: ${res.status} ${res.statusText}`);
            return null;
        }
        const json = await res.json();
        return json.data;
    } catch (e) {
        console.error('OG Image Fetch Exception:', e);
        return null;
    }
}

export default async function Image(props: { params: Promise<{ locale: string; id: string }> }) {
    const params = await props.params;
    const hadith = await getHadith(params.id);

    // Common styles
    const emerald900 = '#064e3b';
    const emerald950 = '#022c22';
    const gold500 = '#d4af37';
    const sand100 = '#f5f5f0';

    // Fallback if hadith not found
    if (!hadith) {
        return new ImageResponse(
            (
                <div style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: emerald900,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '40px'
                }}>
                    Hadith Not Found
                </div>
            ),
            { ...size }
        );
    }

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: sand100,
                    fontFamily: 'sans-serif',
                }}
            >
                {/* Top colored bar */}
                <div style={{ display: 'flex', height: '24px', width: '100%', backgroundColor: emerald900 }} />

                <div style={{ display: 'flex', flex: 1, padding: '60px' }}>

                    {/* Left Side: Metadata */}
                    <div style={{ display: 'flex', flexDirection: 'column', width: '35%', borderRight: `1px solid ${gold500}44`, paddingRight: '40px' }}>
                        {/* Logo Circle */}
                        <div style={{
                            width: '120px', height: '40px', backgroundColor: emerald900,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: gold500, fontWeight: 'bold', fontSize: '18px', marginBottom: '30px',
                            textTransform: 'uppercase', letterSpacing: '0.1em'
                        }}>
                            Mumin
                        </div>

                        {/* Collection Label */}
                        <div style={{ display: 'flex', fontSize: '24px', color: emerald900, opacity: 0.6, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            Collection
                        </div>
                        {/* Collection Name */}
                        <div style={{ display: 'flex', fontSize: '36px', color: emerald900, fontWeight: 'bold', marginBottom: '40px', lineHeight: 1.2 }}>
                            {hadith.collection || 'Sahih Collection'}
                        </div>

                        {/* Hadith No Label */}
                        <div style={{ display: 'flex', fontSize: '24px', color: emerald900, opacity: 0.6, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            Hadith No.
                        </div>
                        {/* Hadith Number */}
                        <div style={{ display: 'flex', fontSize: '48px', color: gold500, fontWeight: 'bold' }}>
                            {hadith.hadithNumber}
                        </div>
                    </div>

                    {/* Right Side: Text */}
                    <div style={{ display: 'flex', flexDirection: 'column', width: '65%', paddingLeft: '60px', justifyContent: 'center' }}>
                        <div style={{
                            display: 'flex',
                            fontSize: '32px',
                            color: emerald950,
                            lineHeight: 1.6,
                            fontWeight: 500,
                        }}>
                            "{hadith.translation?.text || hadith.arabicText || ''}"
                        </div>

                        {hadith.bookNumber && (
                            <div style={{ marginTop: '40px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ display: 'flex', fontSize: '20px', color: emerald900, opacity: 0.6 }}>Book {hadith.bookNumber}</div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{
                    height: '80px',
                    width: '100%',
                    backgroundColor: emerald950,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 60px',
                    color: 'white'
                }}>
                    <div style={{ display: 'flex', fontSize: '24px', fontWeight: 600 }}>Mumin Reader</div>
                    <div style={{ display: 'flex', fontSize: '20px', opacity: 0.8 }}>Read more at mumin.ink</div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
