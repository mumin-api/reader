'use client';

import React, { useEffect, useRef } from 'react';

interface GeometricPatternProps {
    className?: string;
    color?: string;
    opacity?: number;
}

export const GeometricPattern: React.FC<GeometricPatternProps> = ({
    className,
    color = '#064e3b',
    opacity = 0.05,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const drawPattern = () => {
            const width = (canvas.width = window.innerWidth);
            const height = (canvas.height = window.innerHeight);

            ctx.clearRect(0, 0, width, height);
            ctx.strokeStyle = color;
            ctx.globalAlpha = opacity;
            ctx.lineWidth = 1;

            const size = 150;
            const rows = Math.ceil(height / size) + 1;
            const cols = Math.ceil(width / size) + 1;

            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    const x = j * size;
                    const y = i * size;

                    // Simplified geometric shape (Diamond) to reduce draw calls
                    ctx.beginPath();
                    ctx.moveTo(x + size / 2, y + size / 4);
                    ctx.lineTo(x + (size * 3) / 4, y + size / 2);
                    ctx.lineTo(x + size / 2, y + (size * 3) / 4);
                    ctx.lineTo(x + size / 4, y + size / 2);
                    ctx.closePath();
                    ctx.stroke();
                }
            }
        };

        drawPattern();
        window.addEventListener('resize', drawPattern);

        return () => {
            window.removeEventListener('resize', drawPattern);
        };
    }, [color, opacity]);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    );
};
