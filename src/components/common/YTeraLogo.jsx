import { useTheme } from '../../context/ThemeContext';

/**
 * yTera Brand Logo — Pure SVG Component (Theme Aware)
 * Usage: <YTeraLogo size={28} showSlogan={true} />
 */
export default function YTeraLogo({ size = 24, className = '', showSlogan = false }) {
    const scale = size / 24;
    const { isDarkMode } = useTheme();

    return (
        <span className={className} style={{ 
            display: 'inline-flex', 
            flexDirection: 'column', 
            alignItems: 'flex-start', 
            cursor: 'pointer',
            transition: 'transform 0.2s ease'
        }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: `${8 * scale}px` }}>
                {/* Custom SVG Icon - Minimalist "yT" / Infinity Book idea */}
                <svg 
                    width={size * 1.3} 
                    height={size * 1.3} 
                    viewBox="0 0 40 40" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FF5722" />
                            <stop offset="100%" stopColor="#EA580C" />
                        </linearGradient>
                    </defs>

                    {/* Background glow or subtle shape */}
                    <circle cx="20" cy="20" r="18" fill={isDarkMode ? 'rgba(255,167,38,0.05)' : 'rgba(255,87,34,0.03)'} />
                    
                    {/* Infinity / Book Loop */}
                    <path 
                        d="M10 25C10 20 15 15 20 15C25 15 30 20 30 25C30 30 25 35 20 35C15 35 10 30 10 25Z" 
                        stroke="var(--text-primary)" 
                        strokeWidth="3.5" 
                        strokeLinecap="round" 
                        style={{ transition: 'stroke 0.3s ease' }}
                    />
                    <path 
                        d="M10 25C10 18 18 5 25 5C32 5 35 12 35 12" 
                        stroke="url(#logoGradient)" 
                        strokeWidth="3.5" 
                        strokeLinecap="round" 
                        opacity={isDarkMode ? 1 : 0.9}
                    />
                    
                    {/* The "y" tail detail - Orange for Brand y */}
                    <path 
                        d="M20 15V25" 
                        stroke="url(#logoGradient)" 
                        strokeWidth="3.5" 
                        strokeLinecap="round" 
                    />
                </svg>

                {/* Wordmark */}
                <span style={{ 
                    fontWeight: 900, 
                    fontSize: `${size * 1.2}px`, 
                    letterSpacing: '-0.04em', 
                    lineHeight: 1,
                    display: 'flex',
                    alignItems: 'baseline'
                }}>
                    <span style={{ color: '#FF5722' }}>y</span>
                    <span style={{ color: 'var(--text-primary)', transition: 'color 0.3s ease' }}>Tera</span>
                </span>
            </div>
            
            {showSlogan && (
                <span style={{ 
                    fontSize: `${size * 0.42}px`, 
                    color: 'var(--text-secondary)', 
                    fontWeight: 500, 
                    marginTop: '4px', 
                    marginLeft: '2px',
                    letterSpacing: '0.02em',
                    transition: 'color 0.3s ease'
                }}>
                    Le savoir qui circule.
                </span>
            )}
        </span>
    );
}
