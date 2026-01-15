import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return new Response('Missing ID', { status: 400 });
        }

        // Use native fetch instead of Axios for Edge compatibility
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/v1';
        const response = await fetch(`${API_URL}/hadiths/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                // Add API Key if needed, though for public read it might not be strictly required or can be exposed for this internal route
            },
            next: { revalidate: 86400 } // Cache for 24h
        });

        if (!response.ok) {
            return new Response('Hadith not found', { status: 404 });
        }

        const data = await response.json();
        const hadith = data.data || data;

        const text = hadith.translation?.text || '';
        const arabicText = hadith.arabicText || '';
        const reference = `${hadith.collection} ${hadith.hadithNumber}`;

        // Truncate text for the image
        const truncatedText = text.length > 280 ? text.substring(0, 280) + '...' : text;
        const truncatedArabic = arabicText.length > 200 ? arabicText.substring(0, 200) + '...' : arabicText;

        // Load fonts (optional but recommended for better look)
        // For now we'll use system fonts as fetch might be slow on edge without caching

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fffdf9', // sand light
                        backgroundImage: 'radial-gradient(circle at 25px 25px, #064e3b05 2%, transparent 0%), radial-gradient(circle at 75px 75px, #064e3b05 2%, transparent 0%)',
                        backgroundSize: '100px 100px',
                        padding: '60px',
                        position: 'relative',
                    }}
                >
                    {/* Logo/Brand */}
                    <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', top: 40, left: 60 }}>
                        <div style={{ width: 40, height: 40, backgroundColor: '#064e3b', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
                            <span style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginLeft: 10 }}>M</span>
                        </div>
                        <span style={{ fontSize: 24, fontWeight: 700, color: '#064e3b', marginLeft: 15 }}>Mumin Hadith</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', top: 40, right: 60 }}>
                        <span style={{ fontSize: 18, fontWeight: 600, color: '#064e3b40', letterSpacing: '0.1em' }}>{reference}</span>
                    </div>

                    {/* Hadith Content */}
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: 20 }}>
                        {/* Arabic Text */}
                        <p
                            style={{
                                fontSize: 32,
                                color: '#064e3b',
                                textAlign: 'right',
                                lineHeight: 1.6,
                                marginBottom: 40,
                                direction: 'rtl',
                                fontWeight: 600,
                            }}
                        >
                            {truncatedArabic}
                        </p>

                        {/* Translation Text */}
                        <p
                            style={{
                                fontSize: 24,
                                color: '#064e3b80',
                                lineHeight: 1.5,
                                fontWeight: 500,
                            }}
                        >
                            {truncatedText}
                        </p>
                    </div>

                    {/* Footer Decoration */}
                    <div style={{
                        position: 'absolute',
                        bottom: 40,
                        left: 60,
                        right: 60,
                        height: '4px',
                        backgroundColor: '#d4af3720', // gold light
                        borderRadius: '2px',
                    }} />
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
