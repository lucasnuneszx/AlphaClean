"use client";

import { useState } from "react";

type Size = "SMALL" | "MEDIUM" | "LARGE";

const SIZES: { id: Size; label: string; desc: string }[] = [
  { id: "SMALL", label: "Pequeno", desc: "Hatch / Moto Pequena" },
  { id: "MEDIUM", label: "Médio", desc: "Sedan / Moto Média" },
  { id: "LARGE", label: "Grande", desc: "SUV / Pickup / Big Trail" },
];

const BASE_SERVICES = [
  {
    id: "wash_car",
    type: "CAR",
    name: "Lavagem Completa Automóveis",
    prices: { SMALL: 55, MEDIUM: 65, LARGE: 75 },
    desc: "Limpeza técnica detalhada com padrão Alpha Clean."
  },
  {
    id: "wash_moto",
    type: "MOTO",
    name: "Lavagem Completa Motocicleta",
    prices: { SMALL: 30, MEDIUM: 40, LARGE: 50 },
    desc: "Tratamento especializado para duas rodas."
  }
];

const ADD_ONS = [
  { id: "air", name: "Renova Ar", cat: "Interno", desc: "Limpeza de ar condicionado - elimina mau cheiro", prices: { SMALL: 94, MEDIUM: 94, LARGE: 94 } },
  { id: "hygiene", name: "Higienização", cat: "Interno", desc: "Limpeza de bancos, carpete, teto e painel", prices: { SMALL: 250, MEDIUM: 300, LARGE: 350 } },
  { id: "upholstery", name: "Proteção de Estofados", cat: "Interno", desc: "Hipermeabilização com duração de 6 meses a 1 ano", prices: { SMALL: 150, MEDIUM: 200, LARGE: 235 } },
  { id: "leather", name: "Renova Couro", cat: "Interno", desc: "Limpeza e hidratação do couro", prices: { SMALL: 60, MEDIUM: 75, LARGE: 85 } },
  { id: "motor", name: "Brilho Plus Motor", cat: "Interno", desc: "Limpeza técnica de motor", prices: { SMALL: 70, MEDIUM: 80, LARGE: 100 } },
  { id: "alpha_prot", name: "Proteção Alpha", cat: "Externo", desc: "Enceramento com cera líquida", prices: { SMALL: 20, MEDIUM: 35, LARGE: 45 } },
  { id: "mothers", name: "Top Proteção Mothers", cat: "Externo", desc: "Proteção realizada com cera em pasta", prices: { SMALL: 40, MEDIUM: 50, LARGE: 60 } },
  { id: "polish", name: "Polimento Técnico", cat: "Externo", desc: "Polimento especializado, correção de pintura e brilho intenso", prices: { SMALL: 350, MEDIUM: 400, LARGE: 500 } },
  { id: "glass", name: "Glasshield", cat: "Externo", desc: "Repele água e melhora a visibilidade em dias de chuva", prices: { SMALL: 60, MEDIUM: 75, LARGE: 85 } },
  { id: "plastic", name: "Revitalização de Plástico", cat: "Externo", desc: "Revitalização de plásticos internos e externos", prices: { SMALL: 35, MEDIUM: 40, LARGE: 45 } },
];

const CONSULT_SERVICES = [
  { name: "Polimento de Farol" },
  { name: "Polimento de Vidro" },
  { name: "Vitrificação de Plástico" },
  { name: "Vitrificação de Pintura" },
];

export function ServiceSelector() {
  const [size, setSize] = useState<Size>("MEDIUM");
  const [baseId, setBaseId] = useState<string>("wash_car");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const activeBase = BASE_SERVICES.find(s => s.id === baseId) || BASE_SERVICES[0];
  
  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    const basePrice = activeBase.prices[size];
    const addOnsPrice = ADD_ONS
      .filter(a => selectedAddOns.includes(a.id))
      .reduce((acc, curr) => acc + curr.prices[size], 0);
    return basePrice + addOnsPrice;
  };

  const handleWhatsApp = () => {
    const WA_NUMBER = "5511999990000";
    const addOnNames = ADD_ONS.filter(a => selectedAddOns.includes(a.id)).map(a => a.name).join(", ");
    const text = `Ola! Vim pelo site da Alpha Clean. Quero agendar: ${activeBase.name} (${SIZES.find(s => s.id === size)?.label})${addOnNames ? ` + Adicionais: ${addOnNames}` : ""}. Total: R$ ${calculateTotal()}. Poderia confirmar?`;
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <section id="servicos" className="py-24 lg:py-40 bg-[#000c24] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#9fe600]/5 blur-[150px] rounded-full -mr-48 -mt-48" />

      <div className="container-custom mx-auto">
        
        {/* Header */}
        <div className="mb-20 text-center md:text-left">
           <span className="font-[Inter] text-[10px] text-[#9fe600] tracking-[0.4em] uppercase font-bold mb-4 block underline decoration-[#9fe600]/30 underline-offset-8">Protocolo de Limpeza</span>
           <h2 className="font-[Syncopate] text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
             Configure seu <br className="hidden md:block" />
             <span className="text-[#9fe600]">Serviço Lab</span>
           </h2>
        </div>

        <div className="space-y-24">
           
           {/* STEP 1: SIZE SELECTOR */}
           <div className="space-y-8">
              <div className="flex items-center gap-4">
                 <div className="w-8 h-8 rounded-full bg-[#9fe600] text-[#000c24] flex items-center justify-center font-black text-xs">1</div>
                 <h3 className="font-[Syncopate] text-xs font-black text-white uppercase tracking-widest">Porte do Veículo</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {SIZES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSize(s.id)}
                      className={`p-8 rounded-3xl text-left transition-all duration-500 border-2 ${
                        size === s.id ? "bg-[#9fe600] border-[#9fe600] text-[#000c24]" : "bg-white/[0.03] border-white/5 text-white/40 hover:bg-white/5"
                      }`}
                    >
                       <div className="font-[Syncopate] text-lg font-black uppercase mb-1">{s.label}</div>
                       <div className={`text-[10px] uppercase font-mono tracking-widest ${size === s.id ? "text-[#000c24]/60" : "text-white/20"}`}>{s.desc}</div>
                    </button>
                 ))}
              </div>
           </div>

           {/* STEP 2: BASE SERVICE */}
           <div className="space-y-8">
              <div className="flex items-center gap-4">
                 <div className="w-8 h-8 rounded-full bg-[#9fe600] text-[#000c24] flex items-center justify-center font-black text-xs">2</div>
                 <h3 className="font-[Syncopate] text-xs font-black text-white uppercase tracking-widest">Lavagem Completa (Base)</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {BASE_SERVICES.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setBaseId(b.id)}
                      className={`p-10 rounded-[2.5rem] text-left transition-all duration-500 border-2 flex justify-between items-center ${
                        baseId === b.id ? "bg-white/[0.05] border-[#9fe600] shadow-[0_0_30px_rgba(159,230,0,0.1)]" : "bg-white/[0.03] border-white/5"
                      }`}
                    >
                       <div>
                          <div className={`font-[Syncopate] text-sm font-black uppercase mb-2 ${baseId === b.id ? "text-[#9fe600]" : "text-white"}`}>{b.name}</div>
                          <div className="text-[11px] text-white/30 max-w-xs">{b.desc}</div>
                       </div>
                       <div className="text-right">
                          <div className="text-[9px] text-white/20 uppercase font-mono mb-1">R$</div>
                          <div className="font-[Syncopate] text-2xl font-black text-white">{b.prices[size]}</div>
                       </div>
                    </button>
                 ))}
              </div>
           </div>

           {/* STEP 3: ADD-ONS (EXTRAS) */}
           <div className="space-y-12">
              <div className="flex items-center gap-4">
                 <div className="w-8 h-8 rounded-full bg-[#9fe600] text-[#000c24] flex items-center justify-center font-black text-xs">3</div>
                 <h3 className="font-[Syncopate] text-xs font-black text-white uppercase tracking-widest">Adicionais (Extras)</h3>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                 {/* Internal Care */}
                 <div className="space-y-6">
                    <h4 className="font-[Roboto_Mono] text-[10px] text-[#9fe600]/40 uppercase tracking-[0.4em] font-black pb-4 border-b border-white/5">Cuidado Interno</h4>
                    <div className="space-y-3">
                       {ADD_ONS.filter(a => a.cat === "Interno").map(a => (
                          <button
                            key={a.id}
                            onClick={() => toggleAddOn(a.id)}
                            className={`w-full p-6 rounded-2xl text-left border transition-all flex justify-between items-center group ${
                              selectedAddOns.includes(a.id) ? "bg-[#9fe600]/10 border-[#9fe600] shadow-[0_0_20px_rgba(159,230,0,0.05)]" : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05]"
                            }`}
                          >
                             <div className="flex items-center gap-4">
                                <div className={`w-4 h-4 rounded-full border-2 transition-all ${selectedAddOns.includes(a.id) ? "bg-[#9fe600] border-[#9fe600]" : "border-white/10"}`} />
                                <div>
                                   <div className={`text-[12px] font-black uppercase tracking-widest transition-colors ${selectedAddOns.includes(a.id) ? "text-white" : "text-white/40 group-hover:text-white"}`}>{a.name}</div>
                                   <div className="text-[9px] text-white/20 uppercase mt-1">{a.desc}</div>
                                </div>
                             </div>
                             <div className={`font-mono text-xs font-black ${selectedAddOns.includes(a.id) ? "text-[#9fe600]" : "text-white/20"}`}>+ R$ {a.prices[size]}</div>
                          </button>
                       ))}
                    </div>
                 </div>

                 {/* External Care */}
                 <div className="space-y-6">
                    <h4 className="font-[Roboto_Mono] text-[10px] text-[#9fe600]/40 uppercase tracking-[0.4em] font-black pb-4 border-b border-white/5">Cuidado Externo</h4>
                    <div className="space-y-3">
                       {ADD_ONS.filter(a => a.cat === "Externo").map(a => (
                          <button
                            key={a.id}
                            onClick={() => toggleAddOn(a.id)}
                            className={`w-full p-6 rounded-2xl text-left border transition-all flex justify-between items-center group ${
                              selectedAddOns.includes(a.id) ? "bg-[#9fe600]/10 border-[#9fe600] shadow-[0_0_20px_rgba(159,230,0,0.05)]" : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05]"
                            }`}
                          >
                             <div className="flex items-center gap-4">
                                <div className={`w-4 h-4 rounded-full border-2 transition-all ${selectedAddOns.includes(a.id) ? "bg-[#9fe600] border-[#9fe600]" : "border-white/10"}`} />
                                <div>
                                   <div className={`text-[12px] font-black uppercase tracking-widest transition-colors ${selectedAddOns.includes(a.id) ? "text-white" : "text-white/40 group-hover:text-white"}`}>{a.name}</div>
                                   <div className="text-[9px] text-white/20 uppercase mt-1">{a.desc}</div>
                                </div>
                             </div>
                             <div className={`font-mono text-xs font-black ${selectedAddOns.includes(a.id) ? "text-[#9fe600]" : "text-white/20"}`}>+ R$ {a.prices[size]}</div>
                          </button>
                       ))}
                    </div>
                 </div>
              </div>
           </div>

           {/* CONSULT SERVICES */}
           <div className="pt-12 border-t border-white/5 text-center">
              <span className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-black mb-8 block">Serviços Sob Consulta</span>
              <div className="flex flex-wrap justify-center gap-4">
                 {CONSULT_SERVICES.map(s => (
                    <div key={s.name} className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-[9px] uppercase font-bold tracking-widest text-white/40">
                       {s.name}
                    </div>
                 ))}
              </div>
           </div>

           {/* FINAL SUMMARY */}
           <div className="p-10 md:p-16 bg-gradient-to-br from-[#9fe600]/10 to-transparent border-2 border-[#9fe600]/20 rounded-[3rem] relative overflow-hidden group">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-12 relative z-10">
                 <div className="text-center md:text-left">
                    <span className="text-[10px] text-[#9fe600] font-black uppercase tracking-[0.4em] mb-4 block">Orçamento em Tempo Real</span>
                    <h4 className="font-[Syncopate] text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
                       Protocolo Selecionado <br />
                       <span className="text-white/40">{size} • {activeBase.name}</span>
                    </h4>
                 </div>
                 <div className="flex flex-col items-center md:items-end gap-8">
                    <div className="text-center md:text-right">
                       <span className="text-[12px] text-[#9fe600] font-black uppercase mb-2 block font-mono">Investimento Lab</span>
                       <span className="font-[Syncopate] text-6xl md:text-7xl font-black text-white tracking-tighter">
                          <span className="text-2xl font-light">R$</span> {calculateTotal()}
                       </span>
                    </div>
                    <button 
                      onClick={handleWhatsApp}
                      className="px-16 py-7 bg-[#9fe600] text-[#000c24] font-[Syncopate] text-xs font-black uppercase tracking-[0.3em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_rgba(159,230,0,0.3)]"
                    >
                       Confirmar Protocolo
                    </button>
                 </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#9fe600]/5 blur-[100px] rounded-full" />
           </div>
        </div>
      </div>
    </section>
  );
}
