"use client";

import { motion } from "framer-motion";

const TRANSACTIONS = [
  { id: "T-001", description: "Vitrificação Audi RS6", type: "INCOME", amount: 3200, date: "2024-04-05", status: "PAID" },
  { id: "T-002", description: "Compra Polish Menzerna 400", type: "EXPENSE", amount: 450, date: "2024-04-05", status: "PAID" },
  { id: "T-003", description: "Lavagem Detalhada Golf", type: "INCOME", amount: 180, date: "2024-04-04", status: "PENDING" },
  { id: "T-004", description: "Marketing Facebook Ads", type: "EXPENSE", amount: 1500, date: "2024-04-03", status: "PAID" },
  { id: "T-005", description: "Polimento Técnico Jeep", type: "INCOME", amount: 1200, date: "2024-04-02", status: "PAID" },
];

export default function FinancePage() {
  return (
    <div className="space-y-12">
      {/* ── TOP ACTION BAR ── */}
      <div className="flex justify-between items-center bg-[#000c24]/40 border border-white/5 p-10 rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
         <div className="flex flex-col z-10">
            <h2 className="font-[Syncopate] text-[11px] font-black text-white uppercase tracking-[0.4em]">Controle de Caixa Lab</h2>
            <div className="flex items-center gap-4 mt-4">
               <span className="text-3xl font-[Syncopate] font-black text-[#9fe600] shadow-[0_0_20px_rgba(159,230,0,0.2)]">R$ 56.402,00</span>
               <span className="text-[10px] text-white/20 uppercase font-mono tracking-widest bg-white/5 px-4 py-2 rounded-xl">Saldo Detalhatoriun</span>
            </div>
         </div>
         <div className="flex gap-4 z-10">
            <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-2xl text-[9px] uppercase font-black tracking-[0.3em] hover:bg-white/10 transition-all text-white/40">
               Relatório Export
            </button>
            <button className="px-10 py-4 bg-[#9fe600] text-[#000c24] rounded-2xl text-[10px] uppercase font-black tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_rgba(159,230,0,0.3)]">
               + Nova Transação
            </button>
         </div>
         <div className="absolute -bottom-12 -right-12 text-9xl opacity-5 group-hover:scale-110 transition-transform">💵</div>
      </div>

      {/* ── TRANSACTIONS TABLE ── */}
      <div className="bg-[#000c24]/40 border border-white/5 rounded-[2.5rem] overflow-hidden">
         <table className="w-full text-left border-collapse">
            <thead>
               <tr className="border-b border-white/5 bg-[#000c24]/40 backdrop-blur-md">
                  <th className="px-10 py-8 text-[9px] font-black text-white/20 uppercase tracking-[0.4em] font-[Syncopate]">Ref OS</th>
                  <th className="px-10 py-8 text-[9px] font-black text-white/20 uppercase tracking-[0.4em] font-[Syncopate]">Descrição do Protocolo</th>
                  <th className="px-10 py-8 text-[9px] font-black text-white/20 uppercase tracking-[0.4em] font-[Syncopate]">Data</th>
                  <th className="px-10 py-8 text-[9px] font-black text-white/20 uppercase tracking-[0.4em] font-[Syncopate]">Status</th>
                  <th className="px-10 py-8 text-[9px] font-black text-white/20 uppercase tracking-[0.4em] font-[Syncopate] text-right">Montante Lab</th>
               </tr>
            </thead>
            <tbody>
               {TRANSACTIONS.map((t, i) => (
                 <motion.tr 
                   key={t.id}
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: i * 0.05 }}
                   className="border-b border-white/5 hover:bg-white/[0.03] transition-all group cursor-default"
                 >
                    <td className="px-10 py-8 text-[10px] font-mono text-white/10 font-black tracking-widest">{t.id}</td>
                    <td className="px-10 py-8">
                       <div className="flex items-center gap-5">
                          <div className={`w-3 h-3 rounded-full ${t.type === "INCOME" ? "bg-green-500 shadow-[0_0_10px_#22c55e]" : "bg-red-500 shadow-[0_0_10px_#ef4444]"}`} />
                          <span className="text-[12px] font-black text-white uppercase tracking-widest leading-none group-hover:translate-x-2 transition-transform duration-500">{t.description}</span>
                       </div>
                    </td>
                    <td className="px-10 py-8 text-[10px] text-white/30 font-bold tracking-widest uppercase">{t.date}</td>
                    <td className="px-10 py-8">
                       <span className={`text-[8px] font-black px-4 py-2 rounded-xl uppercase tracking-[0.3em] border ${
                         t.status === "PAID" 
                         ? "bg-green-500/5 text-green-500 border-green-500/20" 
                         : "bg-[#9fe600]/5 text-[#9fe600] border-[#9fe600]/20"
                       }`}>
                          {t.status}
                       </span>
                    </td>
                    <td className="px-10 py-8 text-right">
                       <span className={`text-[13px] font-black font-mono tracking-widest ${t.type === "INCOME" ? "text-white" : "text-red-500"}`}>
                          {t.type === "INCOME" ? "+" : "-"} R$ {t.amount.toLocaleString("pt-BR")}
                       </span>
                    </td>
                 </motion.tr>
               ))}
            </tbody>
         </table>
      </div>

      {/* ── SUMMARY CARDS ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
         <motion.div 
           whileHover={{ scale: 1.02 }}
           className="p-10 bg-gradient-to-br from-green-500/5 to-transparent border border-green-500/10 rounded-[2.5rem] flex items-center justify-between group overflow-hidden relative"
         >
            <div className="flex flex-col z-10">
               <span className="text-[10px] font-black text-green-500/40 uppercase tracking-[0.3em] mb-4">Entradas Projetadas</span>
               <span className="text-3xl font-[Syncopate] font-black text-green-500">R$ 15.200</span>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-3xl group-hover:rotate-12 transition-transform shadow-xl">↗</div>
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-green-500/5 blur-[80px] rounded-full pointer-events-none" />
         </motion.div>

         <motion.div 
           whileHover={{ scale: 1.02 }}
           className="p-10 bg-gradient-to-br from-red-500/5 to-transparent border border-red-500/10 rounded-[2.5rem] flex items-center justify-between group overflow-hidden relative"
         >
            <div className="flex flex-col z-10">
               <span className="text-[10px] font-black text-red-500/40 uppercase tracking-[0.3em] mb-4">Despesas em Protocolo</span>
               <span className="text-3xl font-[Syncopate] font-black text-red-500">R$ 8.900</span>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-3xl group-hover:-rotate-12 transition-transform shadow-xl">↘</div>
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-red-500/5 blur-[80px] rounded-full pointer-events-none" />
         </motion.div>
      </div>
    </div>
  );
}
