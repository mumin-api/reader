import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Celestial Miracle Colors
const nobleCream = '#fffdf9';
const emeraldRadiant = '#10b981';
const goldSpiritual = '#fbbf24';
const tealEthereal = '#2dd4bf';
const indigoSoft = '#818cf8';
const deepForest = '#064e3b';

const logoSrc = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyQzIgMTcuNTIgNi40OCAyMiAxMiAyMkMxNy41MiAyMiAyMiAxNy41MiAyMiAxMkMyMiA2LjQ4IDE3LjUyIDIgMTIgMlpNMTIgNEwxNi45NSAxMC41TDE5LjUgMTJMMTYuOTUgMTMuNUwxMiAyMEw3LjA1IDEzLjVMMC41IDEyTDcuMDUgMTAuNUwxMiA0WiIgZmlsbD0iIzA2NGUzYiIvPgo8L3N2Zz4=";

async function getHadith(id: string) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.hadith.mumin.ink/v1';
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

    try {
        const res = await fetch(`${API_URL}/hadiths/${id}`, {
            headers: {
                'X-API-Key': API_KEY || '',
            }
        });
        if (!res.ok) {
            console.error(`OG Fetch Error: ${res.status} ${res.statusText}`);
            return null;
        }
        const data = await res.json();
        // Handle both { data: ... } and direct models
        return data.data || data;
    } catch (e) {
        console.error('OG Image Fetch Exception:', e);
        return null;
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const locale = searchParams.get('locale') || 'en';

        if (!id) {
            return new Response('Missing ID', { status: 400 });
        }

        const hadith = await getHadith(id);

        if (!hadith) {
            return new Response('Hadith not found', { status: 404 });
        }

        const text = hadith.translation?.text || '';
        const collection = hadith.collection || 'Sahih Collection';
        const num = hadith.hadithNumber;

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor: nobleCream,
                        position: 'relative',
                        overflow: 'hidden',
                        fontFamily: 'sans-serif',
                    }}
                >
                    {/* 1. LAYERED LIGHT MESH */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', background: nobleCream }} />

                    <div style={{
                        position: 'absolute', top: '-10%', right: '-10%', width: '100%', height: '100%',
                        background: `radial-gradient(circle, ${emeraldRadiant} 0%, transparent 70%)`, opacity: 0.15, display: 'flex'
                    }} />

                    <div style={{
                        position: 'absolute', bottom: '-20%', left: '-10%', width: '70%', height: '70%',
                        background: `radial-gradient(circle, ${goldSpiritual} 0%, transparent 70%)`, opacity: 0.15, display: 'flex'
                    }} />

                    {/* 2. SIDEBAR CONTENT */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '420px',
                        padding: '80px 60px',
                        justifyContent: 'space-between',
                        background: 'rgba(255, 255, 255, 0.4)',
                        backdropFilter: 'blur(30px)',
                        borderRight: '1px solid rgba(6, 78, 59, 0.05)',
                        zIndex: 20,
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{
                                display: 'flex',
                                padding: '16px',
                                background: 'white',
                                borderRadius: '24px',
                                border: '1px solid rgba(6, 78, 59, 0.1)',
                                alignSelf: 'flex-start',
                                marginBottom: '60px',
                                boxShadow: '0 10px 30px rgba(6, 78, 59, 0.05)',
                            }}>
                                <img src={logoSrc} width="50" height="50" alt="Logo" />
                            </div>

                            <div style={{ color: emeraldRadiant, fontSize: '14px', fontWeight: 800, letterSpacing: '0.2em', marginBottom: '12px', textTransform: 'uppercase' }}>
                                {locale === 'ru' ? 'КОЛЛЕКЦИЯ' : 'COLLECTION'}
                            </div>
                            <div style={{ color: deepForest, fontSize: '42px', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '30px' }}>
                                {collection}
                            </div>

                            <div style={{
                                display: 'flex',
                                padding: '12px 24px',
                                background: 'white',
                                borderRadius: '12px',
                                border: `2px solid ${goldSpiritual}`,
                                alignSelf: 'flex-start'
                            }}>
                                <span style={{ color: deepForest, fontSize: '20px', fontWeight: 800 }}>
                                    {locale === 'ru' ? `Хадис №${num}` : `Hadith #${num}`}
                                </span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ color: 'rgba(6, 78, 59, 0.4)', fontSize: '16px', letterSpacing: '0.1em', fontWeight: 700 }}>MUMIN READER</span>
                            <span style={{ color: 'rgba(6, 78, 59, 0.2)', fontSize: '14px', fontWeight: 600 }}>hadith.mumin.ink</span>
                        </div>
                    </div>

                    {/* 3. MAIN AREA */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        padding: '100px',
                        justifyContent: 'center',
                        zIndex: 20,
                        position: 'relative',
                    }}>
                        <div style={{
                            color: deepForest,
                            fontSize: text.length > 400 ? '28px' : '38px',
                            lineHeight: 1.5,
                            fontWeight: 600,
                            letterSpacing: '-0.01em',
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            {text.length > 600 ? text.substring(0, 600) + '...' : text}
                        </div>

                        <div style={{
                            display: 'flex',
                            height: '4px',
                            width: '100px',
                            background: `linear-gradient(to right, ${emeraldRadiant}, ${goldSpiritual})`,
                            marginTop: '40px',
                            borderRadius: '2px',
                        }} />
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (e: any) {
        console.error('OG API Error:', e);
        return new Response('Internal Server Error', { status: 500 });
    }
}
