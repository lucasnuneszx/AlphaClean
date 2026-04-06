"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const STATS = [
  { label: "Receita (Mês)", value: "R$ 42.060", change: "+12.4%", status: "positive", trend: [10, 25, 15, 30, 22, 40] },
  { label: "Ticket Médio", value: "R$ 1.502", change: "+5.1%", status: "positive", trend: [20, 18, 25, 22, 28, 30] },
  { label: "Agendamentos", value: "84", change: "+12", status: "positive", trend: [5, 10, 8, 15, 12, 18] },
  { label: "Custo Insumos", value: "R$ 8.200", change: "-2.1%", status: "positive", trend: [30, 25, 20, 22, 18, 15] },
];

export default function AdminDashboard() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);

  if (!hasMounted) return null;

  return (
    <div className="space-y-12">
      {/* ── HERO STATS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 bg-[#000c24]/40 border border-white/5 rounded-[2rem] hover:border-[#9fe600]/20 transition-all flex flex-col group relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-8 z-10">
               <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs group-hover:bg-[#9fe600]/20 group-hover:border-[#9fe600]/30 transition-colors">
                  {i === 0 ? "💰" : i === 1 ? "💎" : i === 2 ? "📅" : "🧴"}
               </div>
               <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                 stat.status === "positive" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
               }`}>
                  {stat.change}
               </span>
            </div>
            
            <div className="flex flex-col z-10">
               <span className="text-[10px] font-[Syncopate] font-bold text-white/30 uppercase tracking-[0.3em] mb-2">{stat.label}</span>
               <div className="text-3xl font-[Syncopate] font-black text-white group-hover:text-[#9fe600] transition-colors">{stat.value}</div>
            </div>

            {/* Sparkline Mock */}
            <div className="absolute bottom-0 left-0 right-0 h-16 opacity-10 group-hover:opacity-20 transition-opacity">
               <svg viewBox="0 0 100 40" className="w-full h-full preserve-3d">
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    d="M 0 40 L 20 30 L 40 35 L 60 20 L 80 25 L 100 10"
                    fill="none"
                    stroke="#9fe600"
                    strokeWidth="2"
                  />
               </svg>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── MAIN CONTENT GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Receita Semanal - Maior Destaque */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 p-12 bg-[#000c24]/40 border border-white/5 rounded-[2.5rem] relative overflow-hidden group"
        >
           <div className="flex items-center justify-between mb-12 relative z-10">
              <div className="flex flex-col">
                 <h2 className="font-[Syncopate] text-[11px] font-bold text-white uppercase tracking-[0.4em] mb-2">Desempenho Semanal</h2>
                 <p className="text-[10px] text-white/20 font-mono">Últimos 7 dias de faturamento Alfa</p>
              </div>
              <div className="flex gap-3">
                 <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-[9px] text-white/40 font-bold uppercase tracking-widest cursor-pointer hover:bg-white/10">Mensal</div>
                 <div className="bg-[#9fe600]/10 border border-[#9fe600]/20 px-4 py-2 rounded-xl text-[9px] text-[#9fe600] font-bold uppercase tracking-widest">Semanal</div>
              </div>
           </div>

           <div className="h-72 flex items-end justify-between gap-6 relative z-10">
              {[85, 60, 110, 95, 140, 105, 125].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-6 group/bar">
                   <div className="relative w-full">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${(h / 140) * 100}%` }}
                        transition={{ delay: 1 + i * 0.1, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full bg-gradient-to-t from-[#9fe600]/5 via-[#9fe600]/20 to-[#9fe600] rounded-2xl relative overflow-hidden group-hover/bar:brightness-125 transition-all shadow-[0_0_20px_rgba(159,230,0,0.1)]"
                      >
                         <motion.div 
                           animate={{ y: ["-100%", "100%"] }} 
                           transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                           className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent"
                         />
                      </motion.div>
                   </div>
                   <div className="flex flex-col items-center gap-1">
                      <span className="text-[10px] font-black text-white/60 group-hover/bar:text-[#9fe600] transition-colors">
                        R$ {h * 100}
                      </span>
                      <span className="text-[8px] font-mono text-white/10 uppercase tracking-widest">
                        {["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"][i]}
                      </span>
                   </div>
                </div>
              ))}
           </div>
           
           {/* Background Mesh Glow */}
           <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#9fe600]/5 blur-[100px] rounded-full pointer-events-none" />
        </motion.div>

        {/* Status Diário - Gauge Chart Substituto */}
        <div className="space-y-8 flex flex-col">
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="p-10 bg-[#000c24]/40 border border-white/5 rounded-[2.5rem] flex-1 flex flex-col items-center justify-center text-center relative group"
           >
              <div className="relative w-48 h-48 mb-6">
                 {/* SVG Circular Gauge */}
                 <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="96" cy="96" r="88"
                      className="stroke-white/5 fill-none"
                      strokeWidth="12"
                    />
                    <motion.circle
                      cx="96" cy="96" r="88"
                      className="stroke-[#9fe600] fill-none"
                      strokeWidth="12"
                      strokeDasharray="553"
                      initial={{ strokeDashoffset: 553 }}
                      animate={{ strokeDashoffset: 165 }} // 70% Progress
                      transition={{ duration: 2, ease: "circOut", delay: 1.5 }}
                      strokeLinecap="round"
                    />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-[Syncopate] font-black text-white">70%</span>
                    <span className="text-[8px] text-white/20 uppercase tracking-[0.3em] mt-2 font-bold font-[Inter]">Capacidade</span>
                 </div>
              </div>
              <h3 className="font-[Syncopate] text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">Fluxo Operacional Diário</h3>
              <p className="text-[10px] text-white/20 mt-4 leading-relaxed max-w-[180px]">6 dos 8 boxes de detalhamento estão ocupados no momento.</p>
           </motion.div>

           {/* Quick Actions / Activity */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="p-8 bg-[#9fe600] rounded-[2.5rem] text-[#000c24] group overflow-hidden relative"
           >
              <div className="relative z-10">
                 <h3 className="font-[Syncopate] text-[10px] font-black uppercase tracking-[0.2em] mb-4">Nova Ordem Lab</h3>
                 <p className="text-xs font-[Inter] font-bold leading-relaxed mb-6">Comece um novo protocolo de lavagem técnica agora.</p>
                 <button className="bg-[#000c24] text-white px-6 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all w-full">
                    Iniciar Protocolo
                 </button>
              </div>
              <div className="absolute -bottom-8 -right-8 text-8xl opacity-10 group-hover:scale-110 transition-transform">🚿</div>
           </motion.div>
        </div>

      </div>

      {/* ── RECENT ACTIVITY ── */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="p-10 bg-white/[0.02] border border-white/5 rounded-[2.5rem]"
      >
         <div className="flex items-center justify-between mb-10 text-center md:text-left">
            <h2 className="font-[Syncopate] text-[10px] font-bold text-white uppercase tracking-[0.4em]">Registros de Atividade Lab</h2>
            <button className="text-[9px] text-white/20 hover:text-[#a3e635] uppercase font-bold tracking-widest transition-colors font-[Roboto_Mono]">Histórico Completo →</button>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: "1", action: "Agendamento Confirmado", car: "BMW M3 Sedan", time: "Há 12 min", color: "bg-blue-500" },
              { id: "2", action: "Saída de Caixa", car: "Insumos Polimento", time: "Há 45 min", color: "bg-red-500" },
              { id: "3", action: "Serviço Finalizado", car: "Porsche 911 GT3", time: "Há 2 horas", color: "bg-green-500" },
            ].map(item => (
              <div key={item.id} className="flex items-center gap-4 p-4 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-default group">
                 <div className={`w-2 h-2 rounded-full ${item.color} shadow-[0_0_10px_currentColor]`} />
                 <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-white/80 uppercase group-hover:text-white transition-colors">{item.action}</span>
                    <span className="text-[9px] text-white/30 truncate max-w-[150px]">{item.car} • {item.time}</span>
                 </div>
              </div>
            ))}
         </div>
      </motion.div>
    </div>
  );
}
