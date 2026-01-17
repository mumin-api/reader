import { ImageResponse } from 'next/og';
import { OG_PALETTE, fetchFont } from '@/lib/og-helper';

export const runtime = 'edge';

export const alt = 'Mumin Reader - Authentic Hadith';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image(props: { params: Promise<{ locale: string }> }) {
    console.log('Sanity Test: Main OG Image');
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'red', // Bright red to fail loud
                    color: 'white',
                    fontSize: 80,
                    fontWeight: 'bold',
                }}
            >
                SANITY CHECK
            </div>
        ),
        {
            ...size,
        }
    );
}
