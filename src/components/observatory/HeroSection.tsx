"use client";

import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLivePresence } from "@/hooks/useLivePresence";
import { useSolanaScanner } from "@/hooks/useSolanaScanner";
import {
   Search, ShieldCheck, ChevronRight, Activity, Play,
   AlertCircle, X, ShieldAlert, Unlock, Lock,
   ExternalLink, Copy, Globe, Cpu,
} from "lucide-react";
import { TypewriterText } from "@/components/TypewriterText";
import {
   item, softReveal, SectionTag, MagneticButton,
   SignalPill, FloatingGrid, container,
} from "./UIElements";
import { quickSignals } from "./data";

export function HeroSection() {
   const liveCount = useLivePresence();
   const { scan, isScanning, result, error } = useSolanaScanner();
   const [isSearching, setIsSearching] = useState(false);
   const [query, setQuery] = useState("");
   const [showDetails, setShowDetails] = useState(false);
   const mascotRef = useRef<HTMLDivElement | null>(null);
   const inView = useInView(mascotRef, { once: true, amount: 0.2 });

   const getReasoning = (res: any) => {
      if (res.riskLevel === "DANGER") {
         const reasons = [];
         if (res.details.mintAuthority) reasons.push("Mint Authority is still active (Developer can create new tokens at will)");
         if (res.details.freezeAuthority) reasons.push("Freeze Authority is still active (Developer can lock all trades and burn LP)");
         return reasons.join(". ") + ". This makes the asset highly susceptible to rugpulls or honeypots.";
      }
      if (res.riskLevel === "WATCH") {
         return "Metadata is currently Mutable. While no direct threats are active, the token properties, name, or symbol could be modified later by the owner.";
      }
      if (res.riskLevel === "INVALID") {
         return "This address is a System Account (Wallet), not a Token Mint contract. Standard token security protocols (Mint/Freeze authority) do not apply to personal wallet addresses.";
      }
      return "Clean security profile confirmed. No suspicious authorities or mutable metadata detected on the current contract state. This asset follows standard safety protocols.";
   };

   return (
      <section id="hero-section" className="relative flex min-h-[calc(100vh-80px)] items-center px-4 pb-8 pt-20 md:px-8 lg:px-10">
         {/* Kontainer dipersempit ke 1280px agar elemen lebih merapat */}
         <div className="mx-auto w-full max-w-[1280px]">
            <motion.div
               variants={container}
               initial="hidden"
               animate="show"
               className="relative rounded-[32px] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 shadow-2xl backdrop-blur-2xl md:p-8 lg:p-10"
            >
               <FloatingGrid />

               {/* ─── MAIN LAYOUT GRID: Custom [1fr_auto_1fr] agar proporsional ─── */}
               <div className="relative z-10 flex flex-col gap-12 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-10 xl:gap-16">

                  {/* --- SISI KIRI: Narasi & Deskripsi --- */}
                  <div className="order-2 flex flex-col justify-center space-y-6 lg:order-1 lg:max-w-[480px]">
                     {/* Tag Protokol Aktif */}
                     <motion.div variants={item} className="flex flex-wrap items-center gap-2">
                        <SectionTag label="Protocol active" />
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/15 bg-emerald-400/8 px-3 py-1.5">
                           <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                           <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-300">Live sync</span>
                        </div>
                     </motion.div>

                     {/* Headline */}
                     <motion.div variants={item}>
                        <TypewriterText
                           text="Security that feels sharp, calm, and actually usable."
                           className="text-3xl font-black leading-[1.1] tracking-tight text-white md:text-4xl xl:text-5xl"
                        />
                     </motion.div>

                     {/* Deskripsi */}
                     <motion.p variants={item} className="text-sm leading-relaxed text-white/65 xl:text-base">
                        Scan contracts, follow live chain activity, and protect positions through a more human interface. Less artificial noise. Better rhythm. Stronger visual focus.
                     </motion.p>
                  </div>

                  {/* --- KOLOM TENGAH: Mascot Ikonik Pusat --- */}
                  <motion.div
                     variants={softReveal}
                     className="order-1 relative flex flex-col items-center justify-center py-6 lg:order-2 lg:py-0 lg:min-h-[400px] lg:px-6"
                  >
                     {/* Background Orbits */}
                     <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <motion.div
                           className="absolute h-[280px] w-[280px] rounded-full border border-primary/10 lg:h-[340px] lg:w-[340px]"
                           animate={{ rotate: 360 }}
                           transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                           className="absolute h-[220px] w-[220px] rounded-full border border-dashed border-white/5 lg:h-[260px] lg:w-[260px]"
                           animate={{ rotate: -360 }}
                           transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        />
                     </div>

                     {/* Floating Signals */}
                     {quickSignals.map((signal, index) => (
                        <SignalPill
                           key={signal.label} icon={signal.icon} label={signal.label} value={signal.value} delay={index * 0.4}
                           className={["absolute -left-2 top-[20%] lg:-left-6", "absolute -right-2 top-[60%] lg:-right-4"][index]}
                        />
                     ))}

                     {/* The Mascot */}
                     <motion.div
                        ref={mascotRef}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative z-10 flex w-full max-w-[200px] justify-center xl:max-w-[240px]"
                     >
                        <motion.div
                           animate={{ y: [0, -10, 0], rotate: [0, 1.5, 0, -1.5, 0] }}
                           transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                           className="relative h-[200px] w-[200px] xl:h-[240px] xl:w-[240px]"
                        >
                           <Image src="/assets/chara.png" alt="Guardian mascot" fill className="object-contain drop-shadow-[0_20px_60px_rgba(98,84,255,0.3)]" priority />
                        </motion.div>
                     </motion.div>

                     {/* Status Pill */}
                     <motion.div
                        className="absolute -bottom-4 z-20 flex items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.05] p-2 backdrop-blur-xl lg:-bottom-2"
                     >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary shadow-[0_0_15px_rgba(108,99,255,0.3)]">
                           <Cpu className="h-4 w-4" />
                        </div>
                        <div className="pr-2 whitespace-nowrap">
                           <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/40">Guardian status</div>
                           <div className="text-xs font-black tracking-tight text-white/90">Observation</div>
                        </div>
                     </motion.div>
                  </motion.div>

                  {/* --- SISI KANAN: Fitur Interaktif & Tindakan Pengguna --- */}
                  {/* lg:ml-auto dihapus agar form tidak terlempar ke sudut kanan */}
                  <div className="order-3 flex flex-col justify-center space-y-6 lg:max-w-[400px]">

                     <motion.div variants={item} className="flex flex-col gap-4">
                        {/* Form Input */}
                        <div className={`group relative overflow-hidden rounded-[20px] border p-[1px] backdrop-blur-2xl transition-all duration-500 ${isSearching ? "border-primary/50 bg-[#0b1020]/90 shadow-[0_0_30px_rgba(108,99,255,0.2)]" : "border-white/10 bg-white/[0.04]"}`}>
                           <div className="relative z-10 flex items-center gap-3 rounded-[18px] bg-[#0b1020]/40 px-4 py-3">
                              <Search className={`h-4 w-4 shrink-0 transition-colors ${isSearching ? "text-primary" : "text-white/40"}`} />
                              <div className="min-w-0 flex-1">
                                 <div className="mb-0.5 flex items-center gap-2">
                                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/30">Network Gateway</span>
                                    <div className={`h-1 w-1 rounded-full ${isSearching || isScanning ? "bg-primary animate-pulse" : "bg-white/10"}`} />
                                 </div>
                                 <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onFocus={() => setIsSearching(true)}
                                    onBlur={() => setIsSearching(false)}
                                    placeholder="Paste contract address..."
                                    className="w-full bg-transparent text-sm font-bold tracking-tight text-white outline-none placeholder:text-white/20 placeholder:font-medium border-none focus:ring-0"
                                 />
                              </div>
                           </div>
                        </div>

                        {/* Button Execute */}
                        <div className="flex w-full">
                           <MagneticButton variant="primary" onClick={() => scan(query)}>
                              {isScanning ? (
                                 <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="flex items-center justify-center">
                                    <Activity className="h-4 w-4" />
                                 </motion.div>
                              ) : (
                                 <Play className="h-4 w-4" />
                              )}
                              <span className="font-black uppercase tracking-widest">{isScanning ? "Scanning..." : "Execute Scan"}</span>
                           </MagneticButton>
                        </div>
                     </motion.div>

                     {/* Error Handling */}
                     <AnimatePresence>
                        {error && (
                           <motion.div initial={{ opacity: 0, height: 0, y: -10 }} animate={{ opacity: 1, height: "auto", y: 0 }} exit={{ opacity: 0, height: 0, y: -10 }} className="overflow-hidden">
                              <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-3 py-2 backdrop-blur-md">
                                 <AlertCircle className="h-3.5 w-3.5 shrink-0 text-red-500" />
                                 <span className="text-[10px] font-bold text-red-200/80">{error}</span>
                              </div>
                           </motion.div>
                        )}
                     </AnimatePresence>

                     {/* Security Legend */}
                     <motion.div variants={item} className="space-y-4 rounded-2xl border border-white/[0.04] bg-white/[0.01] p-5 backdrop-blur-sm">
                        <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">Security Intelligence Legend</div>
                        <div className="flex flex-col gap-3">
                           {[
                              { id: "safe", icon: "/assets/safe.png", label: "Clean Profile", desc: "No authorities." },
                              { id: "watch", icon: "/assets/watch.png", label: "Watch Profile", desc: "Mutable risks." },
                              { id: "danger", icon: "/assets/danger.png", label: "Danger Profile", desc: "Active authorities." }
                           ].map((tier) => (
                              <div key={tier.id} className="flex items-center gap-3">
                                 <div className="relative h-6 w-6 shrink-0 shadow-[0_4px_8px_rgba(0,0,0,0.3)]">
                                    <Image src={tier.icon} alt={tier.label} fill className="object-contain" />
                                 </div>
                                 <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase tracking-wider text-white/80">{tier.label}</span>
                                    <span className="text-[9px] font-medium text-white/30">{tier.desc}</span>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </motion.div>
                  </div>
               </div>

               {/* --- Monitoring Meta & Globe --- */}
               <div className="relative z-20 mt-10 border-t border-white/5 pt-6">
                  <motion.div variants={item} className="flex flex-wrap items-center justify-between gap-4">
                     <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Network map active</span>
                        <span className="h-1 w-1 rounded-full bg-emerald-400" />
                        <span className="text-[10px] font-medium text-white/40">14 regions verified</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="flex -space-x-1.5">
                           {Array.from({ length: Math.min(liveCount, 3) }).map((_, i) => (
                              <div key={i} className={`h-4 w-4 rounded-full border border-[#050816] ${i === 0 ? "bg-primary/80" : "bg-cyan-400/80"}`} />
                           ))}
                           {liveCount > 3 && (
                              <div className="flex h-4 w-4 items-center justify-center rounded-full border border-[#050816] bg-white/10 text-[7px] font-bold text-white">
                                 +{liveCount - 3}
                              </div>
                           )}
                        </div>
                        <span className="text-[10px] font-medium text-white/40">{liveCount} live analysts</span>
                     </div>
                  </motion.div>
               </div>

               {/* --- Scan HUD (Full Width Results) --- */}
               <div className="relative z-20 mt-10">
                  <AnimatePresence>
                     {result && (
                        <motion.div
                           initial={{ opacity: 0, y: 30, scale: 0.98 }}
                           animate={{ opacity: 1, y: 0, scale: 1 }}
                           exit={{ opacity: 0, y: 20, scale: 0.98 }}
                           className="group relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0b1020]/70 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-3xl"
                        >
                           <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                              <div className="flex items-center gap-5">
                                 <div className={`relative flex h-16 w-16 items-center justify-center rounded-[18px] border shadow-2xl transition-all duration-500 group-hover:scale-105 ${result.riskLevel === "DANGER" ? "border-red-500/40 bg-red-500/10" :
                                    result.riskLevel === "WATCH" ? "border-amber-500/40 bg-amber-500/10" :
                                       result.riskLevel === "INVALID" ? "border-slate-500/40 bg-slate-500/10" :
                                          "border-emerald-500/40 bg-emerald-500/10"
                                    }`}>
                                    {result.logoURI ? (
                                       <img src={result.logoURI} alt={result.name} className="h-10 w-10 rounded-xl object-contain shadow-lg" />
                                    ) : (
                                       <div className="relative h-8 w-8">
                                          <Image
                                             src={result.riskLevel === "DANGER" ? "/assets/danger.png" : result.riskLevel === "WATCH" ? "/assets/watch.png" : result.riskLevel === "INVALID" ? "/assets/watch.png" : "/assets/safe.png"}
                                             alt={result.riskLevel}
                                             fill
                                             className={`object-contain ${result.riskLevel === "INVALID" ? "opacity-45 grayscale" : ""}`}
                                          />
                                       </div>
                                    )}
                                    <div className={`absolute -right-1.5 -top-1.5 h-4 w-4 rounded-full border-[3px] border-[#0b1020] ${result.riskLevel === "DANGER" ? "bg-red-500" :
                                       result.riskLevel === "WATCH" ? "bg-amber-500" :
                                          result.riskLevel === "INVALID" ? "bg-slate-500" :
                                             "bg-emerald-500"
                                       }`} />
                                 </div>
                                 <div className="min-w-0">
                                    <div className="flex items-center gap-3">
                                       <h4 className="text-xl font-black tracking-tight text-white">{result.name}</h4>
                                       <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-black text-white/45">{result.symbol}</span>
                                    </div>
                                    <div className={`mt-2 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] ${result.riskLevel === "DANGER" ? "text-red-400" :
                                       result.riskLevel === "WATCH" ? "text-amber-400" :
                                          result.riskLevel === "INVALID" ? "text-slate-400" :
                                             "text-emerald-400"
                                       }`}>
                                       <div className={`h-1.5 w-1.5 rounded-full ${result.riskLevel === "DANGER" ? "bg-red-400" : result.riskLevel === "WATCH" ? "bg-amber-400" : "bg-emerald-400"}`} />
                                       {result.riskLevel === "INVALID" ? "NON-TOKEN ENTITY" : `${result.riskLevel} DETECTED`}
                                    </div>
                                 </div>
                              </div>

                              <button
                                 onClick={() => setShowDetails(true)}
                                 className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-white/12 bg-white/5 px-6 text-[10px] font-black uppercase tracking-[0.25em] text-white transition-all hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] active:scale-[0.98] md:w-auto"
                              >
                                 Analysis <ChevronRight className="h-3.5 w-3.5" />
                              </button>
                           </div>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </div>
            </motion.div>
         </div>

         {/* ─── Security Analysis Modal (Global Portal) ─── */}
         <AnimatePresence>
            {showDetails && result && (
               <>
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     onClick={() => setShowDetails(false)}
                     className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xl"
                  />
                  <motion.div
                     initial={{ opacity: 0, scale: 0.9, y: 20 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.9, y: 20 }}
                     className="fixed left-1/2 top-1/2 z-[101] w-[calc(100%-32px)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[32px] border border-white/10 bg-[#0b1020]/95 p-1 shadow-[0_40px_100px_rgba(0,0,0,0.8)] backdrop-blur-3xl"
                  >
                     <div className="flex flex-col p-6 sm:p-10">
                        <div className="flex items-start justify-between">
                           <div className="flex items-center gap-5">
                              <div className={`relative flex h-16 w-16 items-center justify-center rounded-[20px] border shadow-2xl ${result.riskLevel === "DANGER" ? "border-red-500/30 bg-red-500/10" :
                                 result.riskLevel === "WATCH" ? "border-amber-500/30 bg-amber-500/10" :
                                    result.riskLevel === "INVALID" ? "border-slate-500/30 bg-slate-500/10" :
                                       "border-emerald-500/30 bg-emerald-500/10"
                                 }`}>
                                 {result.logoURI ? (
                                    <img src={result.logoURI} alt={result.name} className="h-10 w-10 rounded-xl object-contain" />
                                 ) : (
                                    <div className="relative h-8 w-8">
                                       <Image
                                          src={result.riskLevel === "DANGER" ? "/assets/danger.png" : result.riskLevel === "WATCH" ? "/assets/watch.png" : result.riskLevel === "INVALID" ? "/assets/watch.png" : "/assets/safe.png"}
                                          alt={result.riskLevel}
                                          fill
                                          className={`object-contain ${result.riskLevel === "INVALID" ? "opacity-40 grayscale" : ""}`}
                                       />
                                    </div>
                                 )}
                              </div>
                              <div>
                                 <h3 className="text-2xl font-black tracking-tight text-white">{result.name}</h3>
                                 <div className="mt-1 flex items-center gap-2.5">
                                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-black text-white/55">{result.symbol}</span>
                                    <div className="h-1 w-1 rounded-full bg-white/20" />
                                    <span className={`text-[9px] font-black uppercase tracking-[0.15em] ${result.riskLevel === "DANGER" ? "text-red-400" : result.riskLevel === "WATCH" ? "text-amber-400" : result.riskLevel === "INVALID" ? "text-slate-400" : "text-emerald-400"}`}>
                                       {result.riskLevel === "INVALID" ? "SYSTEM ACCOUNT" : `${result.riskLevel} Profile`}
                                    </span>
                                 </div>
                              </div>
                           </div>
                           <button
                              onClick={() => setShowDetails(false)}
                              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/40 transition-all hover:bg-white/10 hover:text-white"
                           >
                              <X className="h-5 w-5" />
                           </button>
                        </div>

                        <div className="mt-10 space-y-6">
                           <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                              {[
                                 { label: "Mint Authority", status: result.details.mintAuthority === null ? "CLEAN" : "ACTIVE", icon: result.details.mintAuthority === null ? ShieldCheck : ShieldAlert },
                                 { label: "Freeze Authority", status: result.details.freezeAuthority === null ? "CLEAN" : "ACTIVE", icon: result.details.freezeAuthority === null ? ShieldCheck : ShieldAlert },
                                 { label: "Metadata Status", status: result.details.isMutable ? "MUTABLE" : "FIXED", icon: result.details.isMutable ? Unlock : Lock }
                              ].map((node) => (
                                 <div key={node.label} className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                                    <div className={`mb-2 inline-flex p-1.5 rounded-lg ${node.status === "CLEAN" || node.status === "FIXED" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                                       <node.icon className="h-3.5 w-3.5" />
                                    </div>
                                    <div className="text-[9px] font-black uppercase tracking-widest text-white/30">{node.label}</div>
                                    <div className={`mt-0.5 text-[11px] font-bold ${node.status === "CLEAN" || node.status === "FIXED" ? "text-emerald-300" : "text-red-300"}`}>{node.status}</div>
                                 </div>
                              ))}
                           </div>

                           <div className="flex flex-col gap-3">
                              <div className="text-[10px] font-black uppercase tracking-[0.22em] text-white/40">Sage Reasoning & Verdict</div>
                              <div className={`rounded-xl border bg-white/[0.02] p-5 backdrop-blur-md ${result.riskLevel === "DANGER" ? "border-red-500/10" : result.riskLevel === "INVALID" ? "border-slate-500/10" : "border-white/5"}`}>
                                 <p className="text-sm font-medium leading-relaxed text-white/70">
                                    {getReasoning(result)}
                                 </p>
                              </div>
                           </div>

                           <div className="rounded-xl border border-dashed border-white/10 p-4 text-center">
                              <div className="text-[8px] font-black uppercase tracking-[0.25em] text-white/20">{result.riskLevel === "INVALID" ? "Account Owner" : "Program protocol"}</div>
                              <div className="mt-1.5 break-all font-mono text-[9px] text-white/40">{result.riskLevel === "INVALID" ? result.details.owner : result.details.programId}</div>
                           </div>
                        </div>

                        <div className="mt-8 flex items-center gap-3 border-t border-white/5 pt-6">
                           <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] py-3 text-[9px] font-black uppercase tracking-widest text-white transition-all hover:bg-white/[0.08]">
                              <ExternalLink className="h-3 w-3" /> View on Solscan
                           </button>
                           <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] py-3 text-[9px] font-black uppercase tracking-widest text-white transition-all hover:bg-white/[0.08]">
                              <Copy className="h-3 w-3" /> Copy Report
                           </button>
                        </div>
                     </div>
                  </motion.div>
               </>
            )}
         </AnimatePresence>
      </section>
   );
}