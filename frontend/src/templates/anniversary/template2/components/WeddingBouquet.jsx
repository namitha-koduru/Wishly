import React from 'react';

/**
 * WeddingBouquet component
 * Luxury realistic wedding florals: White roses, soft blush roses, white lilies, baby's breath, and eucalyptus greenery.
 */
export function WeddingBouquet({ variant = 'corner-hero', className = '' }) {
  if (variant === 'altar-wreath') {
    return (
      <div className={`grace-bouquet-wrapper variant-${variant} ${className}`} aria-hidden="true">
        <svg viewBox="0 0 360 90" className="grace-bouquet-svg" fill="none">
          <defs>
            <linearGradient id="whiteRoseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#FAF7F2" />
              <stop offset="100%" stopColor="#E8DFD3" />
            </linearGradient>
            <linearGradient id="blushRoseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#FCECEF" />
              <stop offset="100%" stopColor="#E8B4BE" />
            </linearGradient>
            <linearGradient id="sageLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B2C9B0" />
              <stop offset="100%" stopColor="#698567" />
            </linearGradient>
          </defs>

          {/* Arching floral garland */}
          <path d="M40 50 Q 180 20, 320 50" stroke="url(#sageLeafGrad)" strokeWidth="2" strokeLinecap="round" />
          
          {/* Eucalyptus leaves */}
          <path d="M70 42 C60 34, 52 38, 56 46 C64 48, 70 45, 70 42 Z" fill="url(#sageLeafGrad)" />
          <path d="M110 36 C100 28, 92 32, 96 40 C104 42, 110 39, 110 36 Z" fill="url(#sageLeafGrad)" />
          <path d="M250 36 C260 28, 268 32, 264 40 C256 42, 250 39, 250 36 Z" fill="url(#sageLeafGrad)" />
          <path d="M290 42 C300 34, 308 38, 304 46 C296 48, 290 45, 290 42 Z" fill="url(#sageLeafGrad)" />

          {/* Baby's breath sprigs */}
          <circle cx="85" cy="30" r="2.5" fill="#FFFFFF" stroke="#E2D7CC" strokeWidth="0.5" />
          <circle cx="100" cy="24" r="2" fill="#FFFFFF" stroke="#E2D7CC" strokeWidth="0.5" />
          <circle cx="260" cy="24" r="2" fill="#FFFFFF" stroke="#E2D7CC" strokeWidth="0.5" />
          <circle cx="275" cy="30" r="2.5" fill="#FFFFFF" stroke="#E2D7CC" strokeWidth="0.5" />

          {/* White Roses and Center Blush Rose */}
          <circle cx="140" cy="40" r="14" fill="url(#whiteRoseGrad)" stroke="#D4C5B3" strokeWidth="0.8" />
          <circle cx="220" cy="40" r="14" fill="url(#whiteRoseGrad)" stroke="#D4C5B3" strokeWidth="0.8" />

          {/* Center Main Rose */}
          <circle cx="180" cy="38" r="18" fill="url(#blushRoseGrad)" stroke="#DBA3AE" strokeWidth="0.9" />
          <path d="M172 34 C170 26, 190 26, 188 34 C186 40, 174 40, 172 34 Z" fill="#F8CCD5" stroke="#D18E9B" strokeWidth="0.75" />
          <circle cx="180" cy="37" r="4" fill="#BF6D7D" />
        </svg>
      </div>
    );
  }

  // Corner Hero / Full Wedding Bouquet
  return (
    <div className={`grace-bouquet-wrapper variant-${variant} ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 300 300"
        className="grace-bouquet-svg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pureWhiteRose" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="55%" stopColor="#FAF7F2" />
            <stop offset="100%" stopColor="#EBE0D3" />
          </linearGradient>

          <linearGradient id="delicateBlushRose" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#FDECEF" />
            <stop offset="85%" stopColor="#F7C8D1" />
            <stop offset="100%" stopColor="#E2A1AE" />
          </linearGradient>

          <linearGradient id="eucalyptusSage" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#CDE0CB" />
            <stop offset="60%" stopColor="#9BB898" />
            <stop offset="100%" stopColor="#6C8B69" />
          </linearGradient>

          <linearGradient id="darkEucalyptus" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8EAA8A" />
            <stop offset="100%" stopColor="#4A6547" />
          </linearGradient>

          <linearGradient id="satinSilkRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#FAF6F0" />
            <stop offset="100%" stopColor="#EADDCF" />
          </linearGradient>

          <filter id="softGlowShadow" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="2" dy="8" stdDeviation="8" floodColor="#4A6547" floodOpacity="0.1" />
          </filter>
        </defs>

        {/* Outer Greenery & Eucalyptus Leaves */}
        <g id="eucalyptus-foliage" filter="url(#softGlowShadow)">
          {/* Top Leaf Sprays */}
          <path d="M150 140 C110 90, 60 70, 40 40 C70 40, 110 80, 150 140 Z" fill="url(#darkEucalyptus)" />
          <path d="M160 140 C190 90, 240 70, 260 40 C230 40, 190 80, 160 140 Z" fill="url(#eucalyptusSage)" />
          <path d="M150 130 C135 70, 140 30, 150 10 C160 30, 165 70, 150 130 Z" fill="url(#eucalyptusSage)" />

          {/* Left & Right Fan Leaves */}
          <path d="M130 160 C80 140, 40 120, 20 100 C45 110, 85 140, 130 160 Z" fill="url(#eucalyptusSage)" />
          <path d="M170 160 C220 140, 260 120, 280 100 C255 110, 215 140, 170 160 Z" fill="url(#darkEucalyptus)" />
        </g>

        {/* Baby's Breath White Florets (Gypsophila) */}
        <g id="babys-breath">
          <circle cx="55" cy="55" r="3.2" fill="#FFFFFF" stroke="#E2D7CC" strokeWidth="0.6" />
          <circle cx="70" cy="45" r="2.8" fill="#FFFFFF" stroke="#E2D7CC" strokeWidth="0.6" />
          <circle cx="85" cy="60" r="3" fill="#FFFFFF" stroke="#E2D7CC" strokeWidth="0.6" />
          <circle cx="245" cy="55" r="3.2" fill="#FFFFFF" stroke="#E2D7CC" strokeWidth="0.6" />
          <circle cx="230" cy="45" r="2.8" fill="#FFFFFF" stroke="#E2D7CC" strokeWidth="0.6" />
          <circle cx="215" cy="60" r="3" fill="#FFFFFF" stroke="#E2D7CC" strokeWidth="0.6" />
          <circle cx="140" cy="25" r="2.8" fill="#FFFFFF" stroke="#E2D7CC" strokeWidth="0.6" />
          <circle cx="160" cy="25" r="2.8" fill="#FFFFFF" stroke="#E2D7CC" strokeWidth="0.6" />
        </g>

        {/* White Lilies & Flower Blooms Layer */}
        <g id="lilies-layer">
          {/* White Lily Left Petals */}
          <path d="M100 130 C70 95, 80 75, 100 85 C115 95, 110 120, 100 130 Z" fill="#FFFFFF" stroke="#E5DACD" strokeWidth="0.75" />
          {/* White Lily Right Petals */}
          <path d="M200 130 C230 95, 220 75, 200 85 C185 95, 190 120, 200 130 Z" fill="#FFFFFF" stroke="#E5DACD" strokeWidth="0.75" />
        </g>

        {/* Luxurious Wedding Roses */}
        <g id="roses-composition">
          {/* Left Pure White Rose */}
          <g transform="translate(85, 120)">
            <circle cx="22" cy="22" r="26" fill="url(#pureWhiteRose)" stroke="#D8C8B5" strokeWidth="0.9" />
            <path d="M10 18 C8 8, 34 8, 32 18 C30 26, 14 26, 10 18 Z" fill="#FFFDF8" stroke="#D1BEA8" strokeWidth="0.8" />
            <path d="M14 22 C12 14, 30 14, 28 22 C26 28, 16 28, 14 22 Z" fill="#F4EAE0" stroke="#C5B099" strokeWidth="0.75" />
            <circle cx="21" cy="21" r="5" fill="#BFA78E" opacity="0.85" />
          </g>

          {/* Right Pure White Rose */}
          <g transform="translate(155, 120)">
            <circle cx="22" cy="22" r="26" fill="url(#pureWhiteRose)" stroke="#D8C8B5" strokeWidth="0.9" />
            <path d="M10 18 C8 8, 34 8, 32 18 C30 26, 14 26, 10 18 Z" fill="#FFFDF8" stroke="#D1BEA8" strokeWidth="0.8" />
            <path d="M14 22 C12 14, 30 14, 28 22 C26 28, 16 28, 14 22 Z" fill="#F4EAE0" stroke="#C5B099" strokeWidth="0.75" />
            <circle cx="21" cy="21" r="5" fill="#BFA78E" opacity="0.85" />
          </g>

          {/* Center Royal Blush Rose */}
          <g transform="translate(112, 85)">
            <circle cx="38" cy="38" r="36" fill="url(#delicateBlushRose)" stroke="#E5ABB6" strokeWidth="1" />
            <path d="M16 32 C12 14, 60 14, 56 32 C54 50, 20 50, 16 32 Z" fill="#FCE9ED" stroke="#DFA0AC" strokeWidth="0.85" />
            <path d="M24 36 C20 22, 52 22, 48 36 C46 46, 26 46, 24 36 Z" fill="#F8D4DC" stroke="#D68B99" strokeWidth="0.8" />
            <circle cx="37" cy="37" r="6.5" fill="#BD6879" />
          </g>
        </g>

        {/* Satin Silk Wedding Ribbon Bow & Tails */}
        <g transform="translate(95, 230)" filter="url(#softGlowShadow)">
          {/* Ribbon Loops */}
          <path d="M55 14 C40 -2, 14 2, 24 18 C30 26, 48 18, 55 16 Z" fill="url(#satinSilkRibbon)" stroke="#D8C8B5" strokeWidth="1" />
          <path d="M55 14 C70 -2, 96 2, 86 18 C80 26, 62 18, 55 16 Z" fill="url(#satinSilkRibbon)" stroke="#D8C8B5" strokeWidth="1" />
          <circle cx="55" cy="16" r="5.5" fill="#EAE0D3" stroke="#D1BEA8" strokeWidth="0.9" />
          {/* Flowing Ribbon Tails */}
          <path d="M52 20 C46 32, 34 42, 22 52 C30 48, 42 44, 50 26 Z" fill="#F7F2EC" opacity="0.95" />
          <path d="M58 20 C64 32, 76 42, 88 52 C80 48, 68 44, 60 26 Z" fill="#F7F2EC" opacity="0.95" />
        </g>
      </svg>
    </div>
  );
}

export default WeddingBouquet;
