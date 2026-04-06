"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "./components/ui/Header";
import { HeroSection } from "./components/ui/HeroSection";
import { ServiceSelector } from "./components/ui/ServiceSelector";
import { Footer } from "./components/ui/Footer";
import { Preloader } from "./components/ui/Preloader";
import { BrandTicker } from "./components/ui/BrandTicker";

// ─── CONFIG ───
const WA_NUMBER = "5511999990000"; // Substitua pelo número real

const IconWA = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

function FloatingWA() {
  return (
    <motion.a
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 3.5, type: "spring", stiffness: 180, damping: 12 }}
      href={`https://wa.me/${WA_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-transform"
      title="Falar no WhatsApp"
    >
      <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
      <IconWA size={28} />
    </motion.a>
  );
}

export default function Home() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // No-op for analytics or future use
  }, []);

  return (
    <main className="relative bg-[#000c24] selection:bg-[#9fe600]/30">
      <div className="noise" />
      <Preloader onComplete={() => setReady(true)} />
      
      <motion.div 
        animate={{ opacity: ready ? 1 : 0 }} 
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <Header />
        <HeroSection />
        <BrandTicker />
        <ServiceSelector />
        <Footer />
        <FloatingWA />
      </motion.div>
    </main>
  );
}
