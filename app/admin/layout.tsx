"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { AlphaCleanLogo } from "../components/ui/AlphaCleanLogo";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: "📊" },
  { label: "Operacional", href: "/admin/kanban", icon: "🚗" },
  { label: "Financeiro", href: "/admin/finance", icon: "💰" },
  { label: "Clientes", href: "/admin/clients", icon: "👥" },
  { label: "Configuração", href: "/admin/settings", icon: "⚙️" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#000c24] text-[#ffffff] flex font-[Inter] overflow-hidden relative">
      
      {/* ── SIDEBAR PROFESSIONALLY ADAPTIVE ── */}
      <aside className={`fixed lg:relative z-40 h-screen transition-all duration-500 ease-[0.16, 1, 0.3, 1] border-r border-white/5 bg-[#000c24]/80 backdrop-blur-3xl rounded-r-[3rem] shadow-[20px_0_100px_rgba(0,0,0,0.5)] ${
        menuOpen ? "w-[320px] translate-x-0" : "w-[320px] -translate-x-full lg:translate-x-0"
      }`}>
        <div className="p-10 lg:p-12">
          <div className="flex items-center gap-4 mb-2">
             {/* Logo Frame */}
             <div className="relative">
               <AlphaCleanLogo size={48} />
             </div>
             <div className="flex flex-col">
                <span className="font-[Syncopate] text-sm font-black tracking-[0.2em] text-white">
                  Alpha<span className="text-[#9fe600]">Core</span>
                </span>
                <span className="text-[8px] text-white/30 uppercase tracking-[0.4em] font-bold">Detalhatoriun OS</span>
             </div>
          </div>
        </div>

        <nav className="flex-1 px-8 space-y-3 mt-10">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                onMouseEnter={() => setIsHovered(item.href)}
                onMouseLeave={() => setIsHovered(null)}
                className={`flex items-center gap-5 px-6 py-5 rounded-[2rem] transition-all relative group ${
                  isActive 
                  ? "bg-[#9fe600] text-[#000c24] font-black shadow-[0_20px_50px_rgba(159,230,0,0.2)]" 
                  : "text-white/30 hover:text-white"
                }`}
              >
                <div className={`text-xl transition-transform group-hover:scale-125 duration-500 ${isActive ? "brightness-0" : ""}`}>
                   {item.icon}
                </div>
                <span className="font-[Syncopate] text-[10px] uppercase font-black tracking-[0.2em]">{item.label}</span>
                
                {/* Hover Glow */}
                {!isActive && isHovered === item.href && (
                  <motion.div 
                    layoutId="sidebar-hover"
                    className="absolute inset-0 bg-white/5 rounded-[2rem] -z-10 border border-white/5 shadow-inner"
                  />
                )}

                {isActive && (
                  <motion.div 
                    layoutId="active-dot" 
                    className="ml-auto w-3 h-3 bg-black rounded-full shadow-inner" 
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-12">
          <div className="p-6 rounded-[2.5rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer group">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#9fe600] to-[#ffffff] p-0.5">
                   <div className="w-full h-full rounded-full bg-[#000c24] flex items-center justify-center overflow-hidden">
                      <div className="text-xl">🤵</div>
                   </div>
                </div>
                <div className="flex flex-col">
                   <span className="text-[11px] font-black text-white uppercase tracking-widest">Admin Master</span>
                   <span className="text-[8px] text-[#9fe600] uppercase tracking-widest font-bold">Studio Online</span>
                </div>
             </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT PROFESSIONALLY SPACED ── */}
      <main className="flex-1 h-screen overflow-y-auto scroll-smooth bg-[#000c24] relative lg:px-20 py-12 px-6 overflow-x-hidden scrollbar-hide">
        
        {/* MOBILE HEADER OVERRIDE */}
        <div className="lg:hidden flex items-center justify-between mb-10 bg-white/5 p-6 rounded-3xl border border-white/10">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#9fe600]/10 flex items-center justify-center text-[#9fe600] font-black">α</div>
              <span className="font-[Syncopate] text-[10px] font-bold text-white tracking-widest uppercase">AlphaCore</span>
           </div>
           <button 
             onClick={() => setMenuOpen(!menuOpen)}
             className="w-10 h-10 rounded-lg bg-white/5 flex flex-col items-center justify-center gap-1"
           >
              <div className="w-4 h-px bg-white" />
              <div className="w-4 h-px bg-[#9fe600]" />
              <div className="w-4 h-px bg-white" />
           </button>
        </div>

        {/* TOP INTERACTIVE BAR - SCALED FOR DESKTOP */}
        <header className="hidden lg:flex items-center justify-between mb-16 relative">
           <div>
              <h1 className="text-[13px] font-[Syncopate] font-black tracking-[0.6em] uppercase text-white/90">
                 {NAV_ITEMS.find(n => n.href === pathname)?.label || "Sistema"}
              </h1>
              <div className="flex items-center gap-4 mt-4">
                 <div className="h-1 w-12 bg-[#9fe600] rounded-full" />
                 <span className="text-[9px] text-white/20 uppercase font-black tracking-[0.2em] font-[Syncopate]">Módulo Alfa v4.2</span>
              </div>
           </div>

           <div className="flex items-center gap-8">
              {/* Global Search Surgical */}
              <div className="bg-white/5 border border-white/10 rounded-[1.5rem] px-8 py-3 flex items-center gap-4 focus-within:border-[#9fe600]/30 transition-all w-[400px]">
                 <span className="text-white/20 opacity-50">🔍</span>
                 <input 
                   type="text" 
                   placeholder="Mãos à obra! Busque clientes, placas ou agendamentos..."
                   className="bg-transparent border-none outline-none text-[11px] text-white/80 w-full placeholder:text-white/40 font-[Inter] font-medium"
                 />
              </div>

              <div className="flex items-center gap-4">
                 <div className="px-6 py-3 rounded-[1.5rem] bg-[#9fe600]/10 border border-[#9fe600]/20 text-[#9fe600] text-[9px] font-black font-[Syncopate] uppercase tracking-widest flex items-center gap-3 shadow-[0_0_50px_rgba(159,230,0,0.05)]">
                    <span className="w-2 h-2 bg-[#9fe600] rounded-full animate-pulse shadow-[0_0_10px_#9fe600]" />
                    Sync Ativo
                 </div>
                 <button className="w-14 h-14 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:scale-105 transition-all text-xl shadow-xl">
                    🔔
                 </button>
              </div>
           </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="pb-32 lg:pb-12 max-w-[1600px]">
           {children}
        </div>

        {/* Floating Contextual Helper */}
        <div className="fixed bottom-12 right-12 z-50">
           <button className="w-20 h-20 rounded-[2.5rem] bg-[#000c24] border-4 border-[#9fe600] flex items-center justify-center text-3xl shadow-[0_20px_100px_rgba(159,230,0,0.3)] hover:scale-110 active:scale-95 transition-all group">
              <span className="group-hover:rotate-12 transition-transform">🔧</span>
           </button>
        </div>
      </main>
    </div>
  );
}
