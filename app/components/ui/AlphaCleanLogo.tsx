"use client";

import { motion } from "framer-motion";

interface LogoProps {
  size?: number;
  className?: string;
  glow?: boolean;
}

export function AlphaCleanLogo({ size = 40, className = "", glow = true }: LogoProps) {
  return (
    <div 
      className={`relative flex items-center justify-center ${className}`}
      style={!className.includes('size-') && !className.includes('w-') ? { width: size, height: size } : {}}
    >
      {/* GLOW LAYER */}
      {glow && (
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[#9fe600]/20 blur-xl rounded-full"
        />
      )}

      {/* SVG MARK - THE SURGICAL ALPHA */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        {/* Abstract "A" Structure - Geometric & Precise */}
        <motion.path
          d="M50 15L15 85H30L50 40L70 85H85L50 15Z"
          stroke="#9fe600"
          strokeWidth="3"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "circOut" }}
        />
        
        {/* Internal Detail - The Precision Core */}
        <motion.path
          d="M40 55H60"
          stroke="#9fe600"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        />

        {/* Floating Accents - Technical Aesthetic */}
        <motion.circle 
          cx="50" cy="50" r="45" 
          stroke="#9fe600" 
          strokeWidth="1" 
          strokeDasharray="4 8"
          strokeOpacity="0.2"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Corner Brackets - Laboratory OS feel */}
        <path d="M10 20V10H20" stroke="#9fe600" strokeWidth="2" strokeOpacity="0.4" />
        <path d="M80 10H90V20" stroke="#9fe600" strokeWidth="2" strokeOpacity="0.4" />
        <path d="M90 80V90H80" stroke="#9fe600" strokeWidth="2" strokeOpacity="0.4" />
        <path d="M20 90H10V80" stroke="#9fe600" strokeWidth="2" strokeOpacity="0.4" />
      </svg>
    </div>
  );
}
