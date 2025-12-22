import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Mira Logo"
  >
    {/* Background */}
    <rect width="120" height="120" rx="24" fill="#09090b" />
    
    {/* Text 'mira' */}
    <text
      x="60"
      y="68"
      fontFamily="Inter, sans-serif"
      fontWeight="700"
      fontSize="52"
      fill="white"
      textAnchor="middle"
      dominantBaseline="middle"
      letterSpacing="-3"
    >
      mira
    </text>
  </svg>
);