"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Zap, Info, Loader2 } from "lucide-react";
import { CrystalCard } from "./CrystalCard";
import { useSystemStatus } from "@/hooks/useSystemStatus";

export function PortfolioShield() {
   const { systemHealth, isAuditing, triggerAudit } = useSystemStatus();

   return (
      <CrystalCard glowColor="rgba(0, 229, 255, 0.1)" className="h-full flex flex-col p-5 group relative overflow-hidden bg-[#0A0D18]/40 border-white/[0.03]">
         
         <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
               <ShieldCheck className="w-4 h-4 text-accent-cyan" />
               <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Guardian Meter</span>
            </div>
            <Info className="w-3.5 h-3.5 text-white/20 hover:text-white/40 cursor-help transition-colors" />
         </div>

         <div className="flex-1 flex flex-col items-center justify-center py-4 relative">
            <AnimatePresence>
               {isAuditing && (
                  <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="absolute inset-0 z-20 flex items-center justify-center bg-[#0A0D18]/60 backdrop-blur-sm rounded-3xl"
                  >
                     <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-8 h-8 text-accent-cyan animate-spin" />
                        <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] animate-pulse">Auditing...</span>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>

            <div className="relative w-44 h-44 flex items-center justify-center">
               <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full transform -rotate-90">
                  <circle
                     cx="50" cy="50" r="46"
                     fill="none"
                     stroke="rgba(255,255,255,0.03)"
                     strokeWidth="1.5"
                     strokeDasharray="2 4"
                  />
                  <motion.circle
                     cx="50" cy="50" r="46"
                     fill="none"
                     stroke="url(#meterGradient)"
                     strokeWidth="3.5"
                     strokeLinecap="round"
                     initial={{ strokeDasharray: "0, 1000" }}
                     animate={{ strokeDasharray: `${systemHealth * 2.89}, 1000` }}
                     transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                  <defs>
                     <linearGradient id="meterGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#4B4AFE" />
                        <stop offset="100%" stopColor="#00E5FF" />
                     </linearGradient>
                  </defs>
               </svg>
               
               <div className="text-center">
                  <motion.span 
                     key={systemHealth}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="text-5xl font-black font-outfit text-white block leading-none"
                  >
                     {systemHealth}
                  </motion.span>
                  <span className="text-[9px] font-black text-safe uppercase tracking-widest mt-2 block">SECURED</span>
               </div>

               <div className="absolute inset-0 rounded-full border border-accent-cyan/10 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
            </div>

            <div className="mt-8 space-y-4 w-full">
               <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-2">
                  <div className="flex items-center justify-between text-[8px] font-black text-white/30 uppercase tracking-widest">
                     <span>Threat Isolation</span>
                     <span className="text-safe">{systemHealth}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${systemHealth}%` }}
                        className="h-full bg-safe" 
                     />
                  </div>
               </div>
               
               <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-2">
                  <div className="flex items-center justify-between text-[8px] font-black text-white/30 uppercase tracking-widest">
                     <span>Logic Integrity</span>
                     <span className="text-accent-cyan">{isAuditing ? 'CALIBRATING' : 'STABLE'}</span>
                  </div>
                  <div className="flex gap-1">
                     {[1,2,3,4,5,6].map(i => (
                        <motion.div 
                           key={i} 
                           animate={{ opacity: isAuditing ? [0.3, 1, 0.3] : 1 }}
                           transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                           className="h-1 flex-1 bg-accent-cyan/40 rounded-full" 
                        />
                     ))}
                  </div>
               </div>
            </div>
         </div>

         <button 
            onClick={() => !isAuditing && triggerAudit()}
            disabled={isAuditing}
            className="w-full py-4 mt-6 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-white transition-all font-black rounded-xl text-[9px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 active:scale-95 shadow-lg group-hover:border-accent-cyan/30 disabled:opacity-50 disabled:cursor-not-allowed"
         >
            {isAuditing ? 'Verification in progress' : 'Audit Protocol'} <Zap className={`w-3.5 h-3.5 text-accent-cyan ${isAuditing ? 'animate-pulse' : ''}`} />
         </button>
      </CrystalCard>
   );
}
