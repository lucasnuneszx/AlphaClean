"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const SERVICES_MOCK = [
  { id: "S-1", name: "Lavagem Detalhada", base: 150, time: "2h" },
  { id: "S-2", name: "Polimento Técnico", base: 1200, time: "8h" },
  { id: "S-3", name: "Vitrificação 9H", base: 2500, time: "12h" },
  { id: "S-4", name: "Detalhamento Interior", base: 600, time: "4h" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"integração" | "estúdio" | "serviços">("integração");

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex gap-10 border-b border-white/5 pb-6">
         {["integração", "estúdio", "serviços"].map(tab => (
           <button 
             key={tab}
             onClick={() => setActiveTab(tab as "integração" | "estúdio" | "serviços")}
             className={`font-[Syncopate] text-[10px] uppercase tracking-[0.4em] font-bold transition-all border-b-2 pb-6 -mb-6 ${
               activeTab === tab ? "text-[#9fe600] border-[#9fe600]" : "text-white/20 border-transparent hover:text-white"
             }`}
           >
             {tab}
           </button>
         ))}
      </div>

      <div className="mt-10">
         {activeTab === "integração" && (
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="space-y-8 bg-white/[0.02] border border-white/5 p-10 rounded-3xl"
           >
              <div className="flex items-center gap-6 mb-10">
                 <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-2xl">🤖</div>
                 <div className="flex flex-col">
                    <h3 className="font-[Syncopate] text-xs font-bold text-white uppercase tracking-widest">Chatwoot Webhook Sync</h3>
                    <span className="text-[10px] text-white/30 uppercase mt-2 font-mono">Conecte seu fluxo do WhatsApp ao CRM AlphaClean</span>
                 </div>
              </div>

              <div className="space-y-6">
                 <div className="flex flex-col gap-3">
                    <label className="text-[9px] font-bold text-white/30 uppercase tracking-widest ml-1">URL de Destino (Webhook)</label>
                    <div className="bg-[#000c24]/40 border border-white/10 rounded-xl px-5 py-4 text-[11px] text-[#9fe600]/80 font-mono flex justify-between items-center group">
                       <span>https://alphaclean-os.pro/api/webhooks/chatwoot</span>
                       <button className="text-[9px] text-white/20 hover:text-white uppercase tracking-widest font-bold">Copiar</button>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-6 pt-4">
                    <div className="flex flex-col gap-3">
                       <label className="text-[9px] font-bold text-white/30 uppercase tracking-widest ml-1">Chatwoot API Key</label>
                       <input 
                         type="password" 
                         defaultValue="******************************"
                         className="bg-[#000c24]/40 border border-white/10 rounded-xl px-5 py-4 text-[11px] text-white focus:border-[#9fe600]/50 outline-none transition-all"
                       />
                    </div>
                    <div className="flex flex-col gap-3">
                       <label className="text-[9px] font-bold text-white/30 uppercase tracking-widest ml-1">Account ID</label>
                       <input 
                         type="text" 
                         defaultValue="1"
                         className="bg-[#000c24]/40 border border-white/10 rounded-xl px-5 py-4 text-[11px] text-white focus:border-[#9fe600]/50 outline-none transition-all font-mono"
                       />
                    </div>
                 </div>
              </div>

              <div className="pt-10 flex gap-4">
                 <button className="px-10 py-4 bg-[#9fe600] text-black font-[Syncopate] text-[10px] font-bold tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl">
                    Testar Conexão
                 </button>
                 <button className="px-10 py-4 border border-white/10 text-white font-[Syncopate] text-[10px] font-bold tracking-widest rounded-full">
                    Salvar
                 </button>
              </div>
           </motion.div>
         )}

         {activeTab === "serviços" && (
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden"
           >
              <table className="w-full text-left">
                 <thead>
                    <tr className="border-b border-white/5 bg-[#000c24]/40">
                       <th className="px-10 py-6 text-[10px] font-bold text-white/30 uppercase tracking-widest font-[Syncopate]">Serviço</th>
                       <th className="px-10 py-6 text-[10px] font-bold text-white/30 uppercase tracking-widest font-[Syncopate]">Tempo Est.</th>
                       <th className="px-10 py-6 text-[10px] font-bold text-white/30 uppercase tracking-widest font-[Syncopate]">Preço Base</th>
                       <th className="px-10 py-6 text-[10px] font-bold text-white/30 uppercase tracking-widest font-[Syncopate] text-right">Ações</th>
                    </tr>
                 </thead>
                 <tbody>
                    {SERVICES_MOCK.map((s) => (
                      <tr key={s.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-all group">
                         <td className="px-10 py-6 text-[11px] font-bold text-white tracking-widest uppercase">{s.name}</td>
                         <td className="px-10 py-6 text-[10px] font-mono text-white/40">{s.time}</td>
                         <td className="px-10 py-6 text-[11px] font-bold text-[#9fe600]">R$ {s.base.toLocaleString("pt-BR")}</td>
                         <td className="px-10 py-6 text-right">
                            <button className="text-[10px] font-bold text-white/20 hover:text-white uppercase tracking-widest transition-all">Editar</button>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
              <div className="p-8 border-t border-white/5">
                 <button className="w-full py-4 border-2 border-dashed border-white/5 rounded-2xl text-[9px] font-bold uppercase tracking-widest text-white/20 hover:border-[#9fe600]/20 hover:text-white/40 transition-all">
                    + Adicionar Novo Serviço
                 </button>
              </div>
           </motion.div>
         )}
      </div>
    </div>
  );
}
