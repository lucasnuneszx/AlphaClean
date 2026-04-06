"use client";

import { useState, useEffect } from "react";
import { AlphaCleanLogo } from "./AlphaCleanLogo";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Serviços", href: "#servicos" },
  { label: "Portfolio", href: "#trabalhos" },
  { label: "Agendamento", href: "#agendar" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWhatsApp = () => {
    const WA_NUMBER = "5511999990000";
    const text = "Ola! Vim pelo site da Alpha Clean e gostaria de agendar uma Lavagem Técnica. Poderia me ajudar?";
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled
          ? "py-6 bg-[#000c24]/80 backdrop-blur-3xl border-b border-white/5"
          : "py-10 bg-transparent"
          }`}
      >
        <div className="container-custom flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 sm:gap-4 group relative z-[110]">
            <div className="relative group-hover:scale-110 transition-transform">
              <AlphaCleanLogo className="w-[34px] h-[34px] xs:w-[38px] xs:h-[38px] sm:w-[48px] sm:h-[48px]" glow={false} />
            </div>
            <div className="flex flex-col">
              <span className="font-[Syncopate] font-bold text-sm sm:text-base tracking-[0.2em] sm:tracking-[0.3em] text-white uppercase leading-none">
                Alpha<span className="text-[#9fe600]">Clean</span>
              </span>
              <span className="hidden xs:block font-[Inter] text-[8px] sm:text-[9px] tracking-[0.5em] text-white/30 uppercase mt-1 px-1">Studio Lab</span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-12">
            {NAV_LINKS.map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link
                  href={link.href}
                  className="font-[Inter] text-[11px] tracking-[0.3em] text-white/40 hover:text-white transition-all uppercase relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-3 left-0 w-0 group-hover:w-full h-px bg-[#9fe600] transition-all duration-500 shadow-[0_0_10px_#9fe600]" />
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center gap-4 sm:gap-8 relative z-[110]">
            <button
              onClick={handleWhatsApp}
              className="hidden md:flex px-10 py-4 bg-[#9fe600] text-[#000c24] font-[Syncopate] text-[11px] font-black tracking-[.2em] hover:brightness-110 hover:scale-105 transition-all active:scale-95 rounded-full shadow-[0_15px_40px_rgba(159,230,0,0.25)] border-2 border-white/10"
            >
              Agendar
            </button>

            {/* MOBILE TOGGLE - SURGICAL DESIGN */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5 focus:outline-none group relative"
            >
              <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl transition-all group-hover:scale-110 group-hover:bg-white/10" />
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="w-5 h-0.5 bg-white origin-center relative z-10"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                className="w-5 h-0.5 bg-[#9fe600] relative z-10"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="w-5 h-0.5 bg-white origin-center relative z-10"
              />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU - FULL PAGE LAB EXPERIENCE */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[100] bg-[#000c24] flex flex-col p-12 lg:hidden overflow-hidden"
          >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#9fe600]/10 blur-[150px] rounded-full -mr-96 -mt-96" />
              <div className="noise-bg absolute inset-0 opacity-20" />
            </div>

            <div className="mt-40 space-y-12 relative z-10">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block"
                  >
                    <span className="text-[10px] text-[#9fe600] font-black font-mono tracking-[0.5em] uppercase mb-4 block">Módulo 0{i + 1}</span>
                    <span className="font-[Syncopate] text-3xl sm:text-4xl font-black tracking-tighter text-white uppercase leading-none block">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto relative z-10 space-y-6 pb-20">
              <button
                onClick={handleWhatsApp}
                className="w-full py-7 bg-[#9fe600] text-[#000c24] font-[Syncopate] text-sm font-black tracking-[.3em] rounded-[2rem] shadow-[0_30px_60px_rgba(159,230,0,0.3)] hover:scale-105 transition-all text-center"
              >
                Agendar
              </button>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-full py-6 border border-white/10 text-white/40 font-[Syncopate] text-[9px] font-black tracking-[.5em] rounded-[2rem] hover:text-white transition-all text-center uppercase"
              >
                Fechar Painel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
