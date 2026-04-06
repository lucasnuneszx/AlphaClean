"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Colunas do Kanban baseadas no JobStatus da Prisma
const COLUMNS = [
  { id: "SCHEDULED", label: "Agendado", color: "bg-blue-500", icon: "📅" },
  { id: "PREV_CHECK", label: "Vistoria", color: "bg-purple-500", icon: "🔍" },
  { id: "IN_PROGRESS", label: "Lavagem", color: "bg-[#9fe600]", icon: "🚿" },
  { id: "FINISHING", label: "Refino", color: "bg-cyan-500", icon: "✨" },
  { id: "READY", label: "Pronto", color: "bg-green-500", icon: "✅" },
  { id: "COMPLETED", label: "Entregue", color: "bg-white/10", icon: "💰" },
];

type Job = {
  id: string;
  client: string;
  vehicle: string;
  plate: string;
  service: string;
  status: string;
  value: number;
  timeRemaining?: string;
};

const MOCK_JOBS: Job[] = [
  { id: "1", client: "João Silva", vehicle: "Porsche 911 GT3", plate: "ALP-9110", service: "Detalhamento Cerâmico", status: "IN_PROGRESS", value: 2500, timeRemaining: "2h 15m" },
  { id: "2", client: "Maria Luiza", vehicle: "Range Rover Velar", plate: "SUV-0101", service: "Higienização Interna", status: "PREV_CHECK", value: 450, timeRemaining: "45m" },
  { id: "3", client: "Carlos Eduardo", vehicle: "BMW M3 Competition", plate: "M3V-1234", service: "Polimento Técnico", status: "SCHEDULED", value: 1200 },
  { id: "4", client: "Thais Fernanda", vehicle: "VW Golf GTI", plate: "GLF-1990", service: "Lavagem Detalhada", status: "READY", value: 180 },
  { id: "5", client: "Ricardo Gomes", vehicle: "Audi RS6 Avant", plate: "RSQ-0066", service: "Vitrificação 9H", status: "IN_PROGRESS", value: 3800, timeRemaining: "5h 20m" },
];

export default function KanbanPage() {
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);

  const moveJob = (id: string, newStatus: string) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, status: newStatus } : j));
  };

  return (
    <div className="flex gap-6 md:gap-10 h-[calc(100vh-180px)] overflow-x-auto pb-10 scrollbar-hide px-2">
      {COLUMNS.map((col) => (
        <motion.div 
          key={col.id} 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="min-w-[88vw] sm:min-w-[340px] flex flex-col group bg-[#000c24]/20 rounded-[2.5rem] border border-white/5"
        >
          {/* Header Coluna */}
          <div className="p-8 flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${col.color} shadow-[0_0_15px_currentColor]`} />
                <h3 className="font-[Syncopate] text-[10px] font-black tracking-[0.3em] text-white/80 uppercase">
                  {col.label}
                </h3>
             </div>
             <span className="text-[10px] font-black font-mono text-white/20 bg-white/5 px-3 py-1 rounded-lg">
                {jobs.filter(j => j.status === col.id).length}
             </span>
          </div>

          {/* Cards List */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto scrollbar-hide">
             <AnimatePresence mode="popLayout">
               {jobs.filter(j => j.status === col.id).map((job) => (
                 <motion.div
                   key={job.id}
                   layoutId={job.id}
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.9 }}
                   transition={{ type: "spring", stiffness: 300, damping: 25 }}
                   className="p-6 bg-white/[0.03] border border-white/5 rounded-[2rem] cursor-grab active:cursor-grabbing hover:bg-white/[0.06] hover:border-[#9fe600]/30 transition-all group/card relative overflow-hidden"
                 >
                    {/* Progress Indicator if in Execution */}
                    {job.status === "IN_PROGRESS" && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-[#9fe600]/20 overflow-hidden">
                        <motion.div 
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="w-1/2 h-full bg-[#9fe600] shadow-[0_0_10px_#9fe600]"
                        />
                      </div>
                    )}

                    <div className="flex justify-between items-start mb-6">
                       <span className="text-[8px] font-black font-mono tracking-widest text-white/20 uppercase">BOX #{job.id}02</span>
                       <button className="text-white/10 hover:text-white transition-colors">•••</button>
                    </div>

                    <h4 className="font-[Syncopate] text-[11px] text-white font-black mb-1 uppercase tracking-wider">{job.vehicle}</h4>
                    <p className="text-[10px] text-white/40 mb-6 font-[Inter] font-medium">{job.client} • {job.plate}</p>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                       <div className="flex flex-col gap-1">
                          <span className="text-[8px] text-white/20 uppercase font-black tracking-widest leading-none">Protocolo</span>
                          <span className="text-[10px] font-bold text-[#9fe600]/80 uppercase tracking-widest">{job.service}</span>
                       </div>
                       <div className="text-right">
                          <span className="text-[8px] text-white/20 uppercase font-black tracking-widest leading-none block mb-1">Valor Lab</span>
                          <span className="text-xs font-black text-white">R$ {job.value.toLocaleString("pt-BR")}</span>
                       </div>
                    </div>

                    {/* Meta info if progress */}
                    {job.timeRemaining && (
                       <div className="mt-4 flex items-center gap-3 py-2 px-4 rounded-xl bg-[#9fe600]/10 border border-[#9fe600]/10 w-fit">
                          <span className="text-[9px] text-[#9fe600] font-black font-mono uppercase tracking-widest ring-offset-neutral-900 ring-neutral-400">Restam {job.timeRemaining}</span>
                       </div>
                    )}

                    {/* Status Hot-Swaps */}
                    <div className="absolute inset-0 bg-[#000c24]/80 backdrop-blur-md opacity-0 group-hover/card:opacity-100 transition-all flex flex-col items-center justify-center p-6 gap-3">
                       <p className="text-[9px] font-black text-[#9fe600] uppercase tracking-[0.4em] mb-4">Mover Protocolo</p>
                       <div className="grid grid-cols-2 gap-2 w-full">
                          {COLUMNS.filter(c => c.id !== job.status).slice(0, 4).map(c => (
                            <button 
                              key={c.id}
                              onClick={() => moveJob(job.id, c.id)}
                              className="py-2.5 px-3 bg-white/5 hover:bg-[#9fe600] hover:text-[#000c24] border border-white/10 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all"
                            >
                              {c.label}
                            </button>
                          ))}
                       </div>
                    </div>
                 </motion.div>
               ))}
             </AnimatePresence>

             {jobs.filter(j => j.status === col.id).length === 0 && (
               <div className="h-32 border-2 border-dashed border-white/5 rounded-[2rem] flex flex-col items-center justify-center gap-2 opacity-20 grayscale transition-all hover:grayscale-0 hover:opacity-100 group/empty cursor-pointer">
                  <span className="text-xl">📂</span>
                  <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em]">Nenhum Box Ativo</span>
               </div>
             )}
          </div>

          {/* Footer Ação */}
          <div className="p-6">
             <button className="w-full py-4 bg-white/5 hover:bg-[#9fe600] hover:text-[#000c24] hover:scale-[1.02] active:scale-[0.98] border border-white/5 rounded-2xl text-[9px] font-black uppercase tracking-[0.3em] text-white/40 transition-all shadow-xl">
                + Iniciar Protocolo
             </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
