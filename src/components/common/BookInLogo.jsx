import { useId } from 'react';

/**
 * BOOK-IN Brand Logo — Reusable SVG Component
 * Usage: <BookInLogo size={28} />
 */
export default function BookInLogo({ size = 24, className = '' }) {
    const scale = size / 24;

    return (
        <span className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: `${4 * scale}px`, cursor: 'pointer' }}>
            {/* Book-exchange icon */}
            <svg width={size * 1.2} height={size * 1.2} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="8" width="18" height="28" rx="3" fill="#FF5722" />
                <rect x="7" y="12" width="12" height="3" rx="1" fill="#FFFFFF" opacity="0.7" />
                <rect x="7" y="18" width="9" height="2" rx="1" fill="#FFFFFF" opacity="0.4" />
                <rect x="26" y="12" width="18" height="28" rx="3" fill="#0F172A" />
                <rect x="29" y="16" width="12" height="3" rx="1" fill="#FFFFFF" opacity="0.7" />
                <rect x="29" y="22" width="9" height="2" rx="1" fill="#FFFFFF" opacity="0.4" />
                {/* Manual Arrows (No markers!) */}
                <path d="M18 24 L30 24 M27 21 L30 24 L27 27" stroke="#FF5722" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M30 28 L18 28 M21 25 L18 28 L21 31" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {/* Wordmark */}
            <span style={{ fontWeight: 900, fontSize: `${size * 0.85}px`, letterSpacing: '-0.02em', lineHeight: 1 }}>
                <span style={{ color: 'currentColor' }}>BOOK</span>
                <span style={{ color: '#FF5722' }}>-IN</span>
            </span>
        </span>
    );
}
