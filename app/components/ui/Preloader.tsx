"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const WIPE_DUR = 1.3;
const WIPE_EASE: [number, number, number, number] = [0.85, 0, 0.15, 1];

const IconShield = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9fe600" strokeWidth="1.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" strokeWidth="2" />
  </svg>
);

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"logo" | "wipe" | "done">("logo");
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const tStartWipe = setTimeout(() => setPhase("wipe"), 2200);
    const tDone = setTimeout(() => {
      setPhase("done");
      onCompleteRef.current();
    }, 2200 + WIPE_DUR * 1000 + 400);

    return () => {
      clearTimeout(tStartWipe);
      clearTimeout(tDone);
    };
  }, []);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <div className="fixed inset-0 z-[9999] overflow-hidden bg-[#000c24] select-none pointer-events-none">
          
          {/* ── LOGO PHASE ── */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: phase === "wipe" ? 0 : 1 }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-10"
            >
              {/* Logo Frame */}
              <div className="relative">
                <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                   className="absolute -inset-8 border border-[#9fe600]/10 rounded-full"
                />
                <div className="w-24 h-24 rounded-full bg-[#9fe600]/5 border border-[#9fe600]/20 flex items-center justify-center backdrop-blur-xl relative z-10 shadow-[0_0_50px_rgba(159,230,0,0.1)]">
                   <IconShield />
                </div>
              </div>

              {/* Textual Identity */}
              <div className="text-center overflow-hidden">
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                   <span className="font-[Syncopate] text-2xl sm:text-3xl font-black text-white tracking-[0.4em] uppercase">
                    Alpha<span className="text-[#9fe600]">Clean</span>
                  </span>
                </motion.div>
                <motion.div
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 1, duration: 1 }}
                   className="font-[Inter] text-[10px] text-white/20 tracking-[0.4em] uppercase mt-6"
                >
                   Paixão em cada Lavagem
                </motion.div>
              </div>

              {/* Slow Pulse Glow */}
              <motion.div 
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-[radial-gradient(circle,rgba(159,230,0,0.05)_0%,transparent_70%)]"
              />
            </motion.div>
          </motion.div>

          {/* ── THE SQUEEGEE WIPE (Cosmic Navy) ── */}
          <motion.div
            className="absolute inset-0 z-20"
            initial={{ x: "0%" }}
            animate={phase === "wipe" ? { x: "100%" } : { x: "0%" }}
            transition={{ duration: WIPE_DUR, ease: WIPE_EASE }}
          >
            {/* BRAND MASK (Trailing) */}
            <div className="absolute inset-0 bg-[#000c24]" />

            {/* THE WATER BLADE (Leading edge) */}
            <div 
              className="absolute top-0 bottom-0 -left-[100px] w-[100px] pointer-events-none"
              style={{
                background: "linear-gradient(270deg, rgba(159,230,0,0.2) 0%, rgba(159,230,0,0.05) 60%, transparent 100%)",
                boxShadow: "10px 0 30px -5px rgba(159,230,0,0.1)",
                borderRight: "2px solid rgba(255,255,255,0.4)"
              }}
            >
              {/* Prism edge */}
              <div className="absolute top-0 bottom-0 right-0 w-[4px] bg-gradient-to-b from-transparent via-[#fff] to-transparent opacity-40" />
            </div>

            {/* Film Grain Texture on the mask for cinematic look */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none noise-bg" />
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
