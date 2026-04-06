"use client";

import Link from "next/link";
import { AlphaCleanLogo } from "./AlphaCleanLogo";

const FOOTER_LINKS = [
  { label: "Nossa História", href: "#sobre" },
  { label: "Nossos Trabalhos", href: "#trabalhos" },
  { label: "Onde Estamos", href: "#contato" },
];

const SERVICES_LINKS = [
  { label: "Lavagem Detalhada" },
  { label: "Polimento Técnico" },
  { label: "Vitrificação de Pintura" },
  { label: "Estética de Interiores" },
];

export function Footer() {
  const year = new Date().getFullYear();

  const handleWhatsApp = () => {
    const WA_NUMBER = "5511999990000";
    const text = "Ola! Vim pelo site da Alpha Clean e gostaria de agendar uma Lavagem Técnica. Poderia me ajudar?";
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <footer className="relative bg-[#000c24] pt-32 pb-12 overflow-hidden border-t border-white/5">
      {/* Glow Effect */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#9fe600]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">

        {/* Top CTA Module */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 pb-20 mb-20 border-b border-white/5">
          <div className="text-center md:text-left">
            <span className="font-[Inter] text-[10px] text-[#9fe600] tracking-[0.4em] uppercase font-bold mb-6 block">Laboratório de Estética Automotiva</span>
            <h2 className="font-[Syncopate] font-black uppercase tracking-tighter text-white leading-tight"
              style={{ fontSize: "clamp(2rem, 8vw, 5rem)" }}>
              Seu carro merece <br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.4)" }}>Padrão Alpha</span>
            </h2>
          </div>
          <button
            onClick={handleWhatsApp}
            className="group relative px-12 py-6 bg-[#9fe600] text-[#000c24] font-[Syncopate] text-xs font-bold tracking-[0.2em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_rgba(159,230,0,0.3)] flex items-center gap-4"
          >
            Agendar
            <span className="text-lg group-hover:translate-x-2 transition-transform">→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 text-center md:text-left">

          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-5 justify-center md:justify-start group">
              <AlphaCleanLogo size={32} glow={false} className="group-hover:scale-110 transition-transform" />
              <span className="font-[Syncopate] font-bold text-lg tracking-[0.3em] text-[#ffffff] uppercase leading-none">
                Alpha<span className="text-[#9fe600]">Clean</span>
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              O padrão laboratorial que o seu veículo merece. Técnica, precisão e o brilho definitivo.
            </p>
          </div>

          {/* Links */}
          <div>
            <div className="font-[Inter] text-[10px] text-[#9fe600] tracking-[0.2em] uppercase font-bold mb-6">Explore</div>
            <ul className="space-y-4">
              {FOOTER_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="font-[Inter] text-xs text-white/50 hover:text-[#9fe600] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cuidado Column (Terminology fix) */}
          <div>
            <div className="font-[Inter] text-[10px] text-[#9fe600] tracking-[0.2em] uppercase font-bold mb-6">Protocolos</div>
            <ul className="space-y-4">
              {SERVICES_LINKS.map((l) => (
                <li key={l.label}>
                  <span className="font-[Inter] text-xs text-white/50">{l.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato Social */}
          <div className="space-y-6">
            <h4 className="font-[Syncopate] text-[10px] font-bold text-[#9fe600] uppercase tracking-[0.4em]">Conexão</h4>
            <div className="flex justify-center md:justify-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#9fe600]/10 hover:border-[#9fe600]/20 transition-all cursor-pointer">📸</div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#9fe600]/10 hover:border-[#9fe600]/20 transition-all cursor-pointer">📱</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 group">
          <span className="text-white/20 text-[10px] uppercase font-bold tracking-widest">
            © {year} Alpha Clean Studio • São Paulo, SP
          </span>
          <div className="flex items-center gap-8 text-white/20 text-[10px] uppercase font-bold tracking-widest">
            <span className="group-hover:text-[#9fe600] transition-colors">By Detalhatoriun OS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
