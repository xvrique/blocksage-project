"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Zap, Globe } from "lucide-react";
import { useState } from "react";
import { CrystalCard } from "./CrystalCard";
import { useSystemStatus } from "@/hooks/useSystemStatus";

export function PulseFeed() {
   const { events, addEvent, clearEvents, triggerAudit } = useSystemStatus();
   const [command, setCommand] = useState("");

   const handleCommand = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && command.trim()) {
         const cmd = command.trim().toLowerCase();
         setCommand("");
         
         if (cmd.startsWith("/scan ")) {
            const addr = command.split(" ")[1];
            addEvent("info", `TERMINAL: Initiating remote scan on ${addr.slice(0, 8)}...`);
         } else if (cmd === "/clear") {
            clearEvents();
         } else if (cmd === "/status") {
            addEvent("info", "TERMINAL: Fetching global node status...");
         } else if (cmd === "/audit") {
            triggerAudit();
         } else {
            addEvent("warning", `TERMINAL: Unknown command '${cmd}'`);
         }
      }
   };

   return (
      <CrystalCard id="pulse-feed" glowColor="rgba(108, 99, 255, 0.05)" className="h-full flex flex-col p-5 group relative overflow-hidden bg-[#0A0D18]/40 border-white/[0.03]">
         
         <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
               <Radio className="w-4 h-4 text-primary animate-pulse" />
               <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Pulse Telemetry</span>
            </div>
            <div className="flex items-center gap-1.5 opacity-40">
               <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
               <span className="text-[8px] font-black text-white uppercase tracking-widest">v4.2</span>
            </div>
         </div>
         
         <div className="flex-1 space-y-3 overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
               {events.map((ev) => (
                  <motion.div
                     key={ev.id}
                     layout
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, scale: 0.9 }}
                     transition={{ duration: 0.4, ease: "easeOut" }}
                     className="p-3.5 rounded-xl border border-white/[0.03] bg-white/[0.01] flex items-start gap-3.5 group hover:bg-white/[0.04] transition-all hover:border-white/[0.08]"
                  >
                     <div className={`mt-0.5 w-1 h-10 rounded-full shrink-0 ${
                        ev.type === 'danger' ? 'bg-danger shadow-[0_0_10px_rgba(255,65,77,0.5)]' : 
                        ev.type === 'warning' ? 'bg-warning shadow-[0_0_10px_rgba(255,171,0,0.5)]' : 
                        ev.type === 'info' ? 'bg-primary shadow-[0_0_10px_rgba(108,99,255,0.5)]' :
                        'bg-safe shadow-[0_0_10px_rgba(0,229,153,0.5)]'
                     }`} />
                     
                     <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1.5 opacity-40 group-hover:opacity-60 transition-opacity">
                           <span className="text-[7px] font-black text-white uppercase tracking-widest">{ev.type} UNIT</span>
                           <span className="text-[7px] font-black text-white uppercase tracking-widest leading-none">{ev.time}</span>
                        </div>
                        <p className="text-[9px] md:text-[10px] font-mono text-white/50 leading-relaxed font-medium group-hover:text-white/90 transition-colors">{ev.msg}</p>
                     </div>
                  </motion.div>
               ))}
            </AnimatePresence>
         </div>

         <div className="mt-6 flex flex-col gap-2">
            <div className="relative">
               <input 
                  type="text" 
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  onKeyDown={handleCommand}
                  placeholder="Terminal command (e.g. /audit)..." 
                  className="w-full bg-white/[0.02] border border-white/[0.04] p-3 text-[9px] font-mono text-white uppercase tracking-widest rounded-lg focus:outline-none focus:border-primary/40 transition-all placeholder:text-white/10"
               />
               <Zap className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-white/10" />
            </div>
            <div className="flex justify-between items-center text-[7px] font-bold text-white/20 uppercase tracking-[0.2em] px-1 mt-1">
               <span>Live Node Feedback</span>
               <span className="text-safe flex items-center gap-1">Connected <Globe className="w-2 h-2" /></span>
            </div>
         </div>

         <div className="absolute top-0 bottom-0 left-[-100%] w-full bg-gradient-to-r from-transparent via-white/[0.012] to-transparent skew-x-[-20deg] animate-[shimmer_10s_infinite_linear] pointer-events-none" />
      </CrystalCard>
   );
}
