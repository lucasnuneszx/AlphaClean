"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

// Real image paths from generation
const HERO_IMG = "/images/detailing/hero.png";

const STATS = [
  { value: "18.000+", label: "Lavagens Realizadas", sub: "Brilho técnico" },
  { value: "100%", label: "Produtos Vonixx", sub: "Sofisticação e Qualidade" },
  { value: "4.9/5", label: "Avaliação Google", sub: "Média de +500 clientes" },
  { value: "+3 anos", label: "Experiência", sub: "Alpha Clean" },
];

function AnimatedCounter({ target }: { target: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) { setStarted(true); } },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let current = 0;
    const targetVal = parseInt(target.replace(/[^0-9]/g, ""));
    const duration = 2000;
    const step = targetVal / (duration / 16);

    const interval = setInterval(() => {
      current += step;
      if (current >= targetVal) {
        setDisplay(target);
        clearInterval(interval);
      } else {
        setDisplay(Math.floor(current).toString() + (target.includes("+") ? "+" : ""));
      }
    }, 16);
    return () => clearInterval(interval);
  }, [started, target]);

  return <span ref={ref}>{display}</span>;
}

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const handleWhatsApp = () => {
    const WA_NUMBER = "5511999990000";
    const text = "Ola! Vim pelo site da Alpha Clean e gostaria de agendar um serviço de estética automotiva. Poderia me ajudar?";
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[110vh] flex flex-col justify-end pt-32 pb-12 lg:pb-24 bg-[#000c24] overflow-hidden"
    >
      {/* ── BACKGROUND PHOTOGRAPHY ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div style={{ y: yImage, scale: scaleImage }} className="relative w-full h-full">
          <Image
            src={HERO_IMG}
            alt="Detailing luxury car"
            fill
            priority
            className="w-full h-full object-cover object-center opacity-60 grayscale-[20%] brightness-[0.7]"
          />
          {/* Deep Navy Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#000c24] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#000c24] via-[#000c24]/40 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(159,230,0,0.05)_0%,transparent_50%)]" />
        </motion.div>
      </div>

      {/* ── CONTENT ── */}
      <div className="container-custom relative z-10 mx-auto w-full">
        <motion.div style={{ opacity: opacityText }}>

          {/* Human Tag */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-10 h-px bg-[#9fe600]/50" />
            <span className="font-[Inter] text-[10px] text-[#9fe600] tracking-[0.3em] uppercase font-bold">
              Estética Automotiva de Precisão
            </span>
          </motion.div>

          {/* Headline */}
          <div className="max-w-4xl mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-[Syncopate] font-black uppercase text-white leading-[0.95] tracking-tighter"
              style={{ fontSize: "clamp(2.5rem, 11vw, 9rem)" }}
            >
              Cuidado <br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.8)" }}>
                Real
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.8, duration: 1 }}
              className="font-[Inter] text-base md:text-xl text-white/50 font-light mt-8 max-w-xl leading-relaxed"
            >
              Seu carro limpo no padrão Alpha Clean.
            </motion.p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-20">
            <button
              onClick={handleWhatsApp}
              className="w-full sm:w-auto bg-[#9fe600] hover:brightness-110 text-[#000c24] px-10 py-5 rounded-full font-[Syncopate] text-xs font-bold tracking-widest transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(159,230,0,0.3)] text-center"
            >
              Agendar
            </button>
            <a
              href="#servicos"
              className="text-white/40 hover:text-white font-[Roboto_Mono] text-[10px] uppercase tracking-widest transition-all"
            >
              Ver nossos trabalhos →
            </a>
          </div>

          {/* Human Stats - Professional Grid Scaling */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 py-16 border-t border-white/5">
            {STATS.map((stat) => (
              <div key={stat.label} className="space-y-3 group/stat">
                <div className="font-[Syncopate] text-3xl md:text-2xl text-white font-black group-hover/stat:text-[#9fe600] transition-colors duration-500">
                  <AnimatedCounter target={stat.value} />
                </div>
                <div className="space-y-1">
                  <div className="font-[Inter] text-[10px] text-white/30 uppercase tracking-[0.3em] font-black shadow-inner">
                    {stat.label}
                  </div>
                  <div className="font-[Inter] text-[9px] text-[#9fe600]/40 uppercase tracking-[0.2em] font-medium">
                    {stat.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
