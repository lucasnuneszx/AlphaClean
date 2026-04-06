"use client";

import { motion } from "framer-motion";

const CLIENTS = [
  { id: "C-001", name: "João Silva", phone: "(11) 99999-0001", email: "joao@exemplo.com", vehicleCount: 2, status: "Vip" },
  { id: "C-002", name: "Maria Luiza", phone: "(11) 98888-1234", email: "maria.lu@exemplo.com", vehicleCount: 1, status: "Active" },
  { id: "C-003", name: "Carlos Eduardo", phone: "(11) 97777-4321", email: "cadu@exemplo.com", vehicleCount: 3, status: "Lead" },
  { id: "C-004", name: "Thais Fernanda", phone: "(11) 96666-5678", email: "thais.f@exemplo.com", vehicleCount: 1, status: "Active" },
  { id: "C-005", name: "Roberto Mendes", phone: "(11) 95555-9012", email: "roberto@exemplo.com", vehicleCount: 1, status: "Active" },
];

export default function ClientsPage() {
  return (
    <div className="space-y-8">
      {/* ── TOP ACTION BAR ── */}
      <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
         <div className="flex flex-col">
            <h2 className="font-[Syncopate] text-xs font-bold text-white uppercase tracking-widest">Base de Clientes</h2>
            <span className="text-[10px] text-white/30 uppercase mt-2 font-mono">Total de Contatos: {CLIENTS.length}</span>
         </div>
         <div className="flex gap-4">
            <div className="bg-white/5 border border-white/10 rounded-full px-5 py-2 flex items-center gap-3">
               <span className="text-white/20">🔍</span>
               <input 
                 type="text" 
                 placeholder="Buscar por nome ou placa..."
                 className="bg-transparent border-none outline-none text-[11px] text-white/80 w-48 placeholder:text-white/10"
               />
            </div>
            <button className="px-8 py-3 bg-white/5 border border-white/10 text-white font-[Syncopate] text-[10px] font-bold tracking-widest rounded-full hover:bg-white/10 transition-all">
               Importar CSV
            </button>
            <button className="px-8 py-3 bg-amber-500 text-black font-[Syncopate] text-[10px] font-bold tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl">
               + Novo Cliente
            </button>
         </div>
      </div>

      {/* ── CLIENTS LIST ── */}
      <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden">
         <table className="w-full text-left">
            <thead>
               <tr className="border-b border-white/5 bg-black/20">
                  <th className="px-8 py-6 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] font-[Syncopate]">Cliente</th>
                  <th className="px-8 py-6 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] font-[Syncopate]">Contato</th>
                  <th className="px-8 py-6 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] font-[Syncopate]">Veículos</th>
                  <th className="px-8 py-6 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] font-[Syncopate]">Status</th>
                  <th className="px-8 py-6 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] font-[Syncopate] text-right">Ações</th>
               </tr>
            </thead>
            <tbody>
               {CLIENTS.map((client, i) => (
                 <motion.tr 
                   key={client.id}
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: i * 0.05 }}
                   className="border-b border-white/5 hover:bg-white/[0.03] transition-all group"
                 >
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center font-bold text-amber-500 text-xs">
                             {client.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div className="flex flex-col">
                             <span className="text-[11px] font-bold text-white uppercase tracking-wider">{client.name}</span>
                             <span className="text-[9px] text-white/20 font-mono">UID: {client.id}</span>
                          </div>
                       </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex flex-col gap-1">
                          <span className="text-[10px] text-white/70">{client.phone}</span>
                          <span className="text-[9px] text-white/30">{client.email}</span>
                       </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-black border border-white/10 flex items-center justify-center text-[10px] text-amber-500 font-bold font-mono">
                             {client.vehicleCount}
                          </span>
                       </div>
                    </td>
                    <td className="px-8 py-6">
                       <span className={`text-[8px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${
                         client.status === "Vip" ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" :
                         client.status === "Lead" ? "bg-blue-500/10 text-blue-500 border border-blue-500/20" :
                         "bg-white/10 text-white/40 border border-white/10"
                       }`}>
                          {client.status}
                       </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all">📝</button>
                          <button className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 flex items-center justify-center transition-all">🗑️</button>
                       </div>
                    </td>
                 </motion.tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );
}
