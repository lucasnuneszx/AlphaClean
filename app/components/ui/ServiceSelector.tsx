"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Category = "HATCH" | "SEDAN" | "SUV" | "PICKUP";

const CATEGORIES: { id: Category; label: string; img: string }[] = [
  { 
    id: "HATCH", 
    label: "Hatchback", 
    img: "/images/detailing/hatch.png" 
  },
  { 
    id: "SEDAN", 
    label: "Sedan Luxo", 
    img: "/images/detailing/sedan.png" 
  },
  { 
    id: "SUV", 
    label: "SUV / Utilitário", 
    img: "/images/detailing/suv.png" 
  },
  { 
    id: "PICKUP", 
    label: "Pickup / 4x4", 
    img: "/images/detailing/pickup.png" 
  },
];

const SERVICES = [
  {
    id: "wash",
    name: "Lavagem Detalhada Artesanal",
    desc: "Mais que uma lavagem, um ritual de limpeza com shampoo de PH neutro e secagem técnica que não agride a pintura.",
    prices: { HATCH: 120, SEDAN: 140, SUV: 180, PICKUP: 200 },
    time: "2 horas",
    tag: "Popular"
  },
  {
    id: "interior",
    name: "Spa Interno Completo",
    desc: "Higienização profunda de tecidos, tratamento de couro com óleos naturais e eliminação de 99.9% de fungos e odores.",
    prices: { HATCH: 280, SEDAN: 320, SUV: 420, PICKUP: 480 },
    time: "4 horas",
    tag: "Essencial"
  },
  {
    id: "polish",
    name: "Correção de Brilho & Pintura",
    desc: "Polimento técnico que remove riscos leves e devolve o 'brilho de zero' ao seu veículo através de mãos especialistas.",
    prices: { HATCH: 600, SEDAN: 700, SUV: 900, PICKUP: 1000 },
    time: "1 dia",
    tag: "Premium"
  },
  {
    id: "coating",
    name: "Proteção Cerâmica (Vitrificação)",
    desc: "A proteção máxima. Uma camada invisível de vidro líquido que protege contra raios UV e sujeira por até 3 anos.",
    prices: { HATCH: 1200, SEDAN: 1400, SUV: 1800, PICKUP: 2100 },
    time: "2 dias",
    tag: "Elite"
  },
];

export function ServiceSelector() {
  const [category, setCategory] = useState<Category>("SEDAN");
  const [selectedSvc, setSelectedSvc] = useState<string | null>(null);

  const activeSvcObj = SERVICES.find(s => s.id === selectedSvc);
  const total = activeSvcObj ? activeSvcObj.prices[category] : 0;

  const handleWhatsApp = () => {
    if (!activeSvcObj) return;
    const WA_NUMBER = "5511999990000";
    const text = `Ola! Vim pelo site da Alpha Clean. Quero agendar: ${activeSvcObj.name} para meu ${category}. Poderia confirmar disponibilidade? Obrigado!`;
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <section id="servicos" className="py-24 lg:py-40 bg-[#000c24] relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#9fe600]/5 blur-[150px] rounded-full -mr-48 -mt-48" />

      <div className="container-custom mx-auto">
        
        {/* Header */}
        <div className="mb-20 text-center md:text-left">
           <span className="font-[Inter] text-[10px] text-[#9fe600] tracking-[0.4em] uppercase font-bold mb-4 block underline decoration-[#9fe600]/30 underline-offset-8">Configure sua Lavagem</span>
           <h2 className="font-[Syncopate] text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
             Selecione seu <br className="hidden md:block" />
             <span className="text-[#9fe600]">veículo</span>
           </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           
           {/* CATEGORY GRID - PROFESSIONALLY SCALED */}
           <div className="lg:col-span-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                 {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      className={`relative group h-64 md:h-80 rounded-3xl overflow-hidden border-2 transition-all duration-500 ${
                        category === cat.id ? "border-[#9fe600] scale-[1.02] z-10 shadow-[0_0_40px_rgba(159,230,0,0.2)]" : "border-white/5 opacity-40 grayscale hover:opacity-100 hover:grayscale-0"
                      }`}
                    >
                      <Image 
                        src={cat.img} 
                        alt={cat.label} 
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#000c24] via-[#000c24]/20 to-transparent" />
                      <div className="absolute bottom-6 left-6 text-left">
                         <span className="block font-[Syncopate] text-[9px] font-black text-white tracking-[0.4em] uppercase mb-2">{cat.label}</span>
                         <div className={`h-1 bg-[#9fe600] transition-all duration-500 ${category === cat.id ? "w-12" : "w-0"}`} />
                      </div>
                    </button>
                 ))}
              </div>
           </div>

           {/* SERVICES SECTION - BREATHING ROOM */}
           <div className="lg:col-span-12 mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {SERVICES.map((svc) => (
                <button
                  key={svc.id}
                  onClick={() => setSelectedSvc(selectedSvc === svc.id ? null : svc.id)}
                  className={`p-10 rounded-[2.5rem] text-left transition-all duration-500 relative overflow-hidden group ${
                    selectedSvc === svc.id ? "bg-[#9fe600] text-[#000c24] shadow-2xl scale-[1.01]" : "bg-white/[0.03] border border-white/5 hover:bg-white/[0.05]"
                  }`}
                >
                   <div className="relative z-10">
                      <div className="flex justify-between items-start mb-6">
                         <div>
                            <span className={`font-[Roboto_Mono] text-[9px] uppercase tracking-widest px-2 py-1 rounded border ${selectedSvc === svc.id ? "border-[#000c24]/20" : "border-white/10 text-white/30"}`}>
                               {svc.tag}
                            </span>
                            <h3 className={`font-[Syncopate] text-xl font-black uppercase mt-4 ${selectedSvc === svc.id ? "text-[#000c24]" : "text-white"}`}>{svc.name}</h3>
                         </div>
                         <div className="text-right">
                             <div className={`font-[Roboto_Mono] text-[9px] uppercase mb-1 ${selectedSvc === svc.id ? "text-[#000c24]/40" : "text-white/20"}`}>Investimento</div>
                             <div className={`font-[Syncopate] text-2xl font-black ${selectedSvc === svc.id ? "text-[#000c24]" : "text-white"}`}>
                               <span className="text-sm font-light">R$</span> {svc.prices[category]}
                             </div>
                         </div>
                      </div>
                      <p className={`font-[Inter] text-sm leading-relaxed mb-8 max-w-sm ${selectedSvc === svc.id ? "text-[#000c24]/70" : "text-white/40"}`}>{svc.desc}</p>
                      <div className={`font-[Roboto_Mono] text-[10px] uppercase font-black ${selectedSvc === svc.id ? "text-[#000c24]/50" : "text-white/20"}`}>Tempo Estimado: {svc.time}</div>
                   </div>
                </button>
              ))}
           </div>

           {/* SUMMARY / WHATSAPP CTA - REDESIGNED FOR DARK MODE */}
           <AnimatePresence>
             {selectedSvc && (
               <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: 30 }}
                 className="lg:col-span-12 mt-24 p-8 md:p-16 bg-[#000c24] border-2 border-[#9fe600]/30 rounded-[3rem] text-white shadow-[0_50px_100px_rgba(0,0,0,0.5)] relative overflow-hidden group"
               >
                  <div className="absolute inset-0 bg-[#9fe600]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  
                  <div className="flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-20 relative z-10">
                     <div className="space-y-4 text-center md:text-left">
                        <span className="font-[Roboto_Mono] text-[10px] text-[#9fe600] uppercase tracking-[0.6em] font-black">Ordem de Serviço Lab</span>
                        <h4 className="font-[Syncopate] text-2xl md:text-4xl font-black uppercase tracking-tighter leading-none">
                           {activeSvcObj?.name} <br />
                           <span className="text-white/40">para seu {category}</span>
                        </h4>
                     </div>
                     <div className="flex flex-col items-center md:items-end gap-10 w-full md:w-auto">
                        <div className="text-center md:text-right">
                           <span className="font-[Roboto_Mono] text-[12px] uppercase font-black text-[#9fe600] block mb-2 tracking-[0.2em]">Total Lab</span>
                           <span className="font-[Syncopate] text-6xl md:text-7xl font-black tracking-tighter leading-none text-white">
                             <span className="text-2xl font-light">R$</span> {total.toLocaleString("pt-BR")}
                           </span>
                        </div>
                        <button 
                          onClick={handleWhatsApp}
                          className="group w-full md:w-auto px-16 py-7 bg-[#9fe600] text-[#000c24] font-[Syncopate] text-sm font-black tracking-[0.3em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_30px_70px_rgba(159,230,0,0.4)] flex items-center justify-center gap-6"
                        >
                          Confirmar Lavagem
                          <span className="text-2xl transition-transform group-hover:translate-x-3">→</span>
                        </button>
                     </div>
                  </div>
               </motion.div>
             )}
           </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
