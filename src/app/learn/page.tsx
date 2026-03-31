"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { BookOpen, Target, ShieldQuestion, Star, Lock, ChevronRight, Award, Zap, ShieldCheck, Trophy, Layers, Search, Wind, Activity, Eye, Cpu } from "lucide-react";
import Image from "next/image";
import { CrystalCard } from "@/components/CrystalCard";
import { useState } from "react";

// --- RPG HUD COMPONENTS ---

function LevelHUD() {
   return (
      <motion.div
         initial={{ opacity: 0, x: 30 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ delay: 0.5 }}
         className="absolute -top-12 -right-4 md:top-[12%] md:right-[-8%] z-20"
      >
         <CrystalCard glowColor="rgba(0, 229, 255, 0.3)" className="p-4 md:p-6 min-w-[200px] md:min-w-[280px]">
            <div className="flex items-center gap-3 mb-5">
               <div className="w-12 h-12 rounded-2xl bg-accent-cyan/20 border border-accent-cyan/40 flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.2)]">
                  <motion.div
                     animate={{ rotateY: [0, 360] }}
                     transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                     <Trophy className="w-6 h-6 text-accent-cyan" />
                  </motion.div>
               </div>
               <div>
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">RANK: TRAINEE</div>
                  <div className="text-sm md:text-xl font-bold font-outfit text-white uppercase tracking-tighter">SAGE NOVICE IV</div>
               </div>
            </div>

            <div className="space-y-3">
               <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-accent-cyan">
                  <span>EXP: 1,240 / 3,000</span>
                  <span>42%</span>
               </div>
               <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
                  <motion.div
                     initial={{ width: 0 }}
                     animate={{ width: "42%" }}
                     className="h-full bg-accent-cyan shadow-[0_0_15px_rgba(0,229,255,0.6)] relative z-10"
                  />
                  <div className="absolute inset-0 bg-white/5 animate-pulse" />
               </div>
               <div className="flex items-center gap-2 pt-2 text-[8px] font-bold text-gray-500 uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 bg-safe rounded-full shadow-[0_0_8px_green]" />
                  <span>Daily Bonus: +20% EXP Active</span>
               </div>
            </div>
         </CrystalCard>
      </motion.div>
   );
}

// --- MODULE CARD UPGRADED ---

function AcademyModule({
   title,
   desc,
   icon: Icon,
   status = 'locked',
   progress = 0,
   glowColor = "rgba(75, 74, 254, 0.2)",
   xp = "500 XP"
}: {
   title: string,
   desc: string,
   icon: any,
   status?: 'completed' | 'active' | 'locked',
   progress?: number,
   glowColor?: string,
   xp?: string
}) {
   const x = useMotionValue(0);
   const y = useMotionValue(0);
   const mouseXSpring = useSpring(x);
   const mouseYSpring = useSpring(y);
   const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
   const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

   function handleMouseMove(e: any) {
      const rect = e.currentTarget.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      x.set(mouseX / width - 0.5);
      y.set(mouseY / height - 0.5);
   }

   function handleMouseLeave() {
      x.set(0);
      y.set(0);
   }

   return (
      <motion.div
         style={{ rotateX, rotateY, perspective: 1000 }}
         onMouseMove={handleMouseMove}
         onMouseLeave={handleMouseLeave}
         className={`relative group h-full ${status === 'locked' ? 'opacity-50 grayscale' : ''}`}
      >
         <CrystalCard glowColor={glowColor} className="h-full flex flex-col p-8 transition-transform duration-300">
            {/* Scanning Beam Overlay */}
            {status !== 'locked' && (
               <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20 group-hover:opacity-40 transition-opacity">
                  <motion.div
                     animate={{ y: ["-100%", "400%", "-100%"] }}
                     transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                     className="h-[1px] w-full bg-white blur-[2px] shadow-[0_0_15px_white]"
                  />
               </div>
            )}

            <div className="flex items-center justify-between mb-8 relative z-10">
               <div className={`w-16 h-16 rounded-3xl flex items-center justify-center border transition-all ${status === 'completed' ? 'bg-safe/10 border-safe/30 text-safe shadow-[0_0_20px_rgba(0,208,132,0.2)]' :
                     status === 'active' ? 'bg-primary/10 border-primary/30 text-primary animate-pulse' :
                        'bg-white/5 border-white/10 text-gray-500'
                  }`}>
                  <Icon className="w-8 h-8" />
               </div>

               <div className={`text-[9px] font-bold px-3 py-1.5 rounded-full border border-white/10 uppercase tracking-[0.2em] backdrop-blur-md ${status === 'completed' ? 'text-safe bg-safe/5 border-safe/20' :
                     status === 'active' ? 'text-primary bg-primary/5 border-primary/20' :
                        'text-gray-500 bg-white/5'
                  }`}>
                  {status === 'completed' ? 'AUDIT PASS' : status === 'active' ? 'LIVE QUERY' : 'ENCRYPTED'}
               </div>
            </div>

            <div className="relative z-10 flex-grow">
               <div className="flex items-center gap-2 mb-3">
                  <span className="text-[8px] font-bold text-gray-500 tracking-widest uppercase">{xp} Reward</span>
                  <div className="w-1 h-1 bg-white/20 rounded-full" />
                  <span className="text-[8px] font-bold text-primary tracking-widest uppercase">Rank Level 1</span>
               </div>
               <h3 className="text-2xl font-bold mb-3 font-outfit uppercase tracking-tighter group-hover:text-primary transition-colors">{title}</h3>
               <p className="text-gray-400 text-sm mb-8 leading-relaxed font-medium line-clamp-2">
                  {desc}
               </p>
            </div>

            <div className="relative z-10 mt-auto">
               {status === 'active' ? (
                  <div className="space-y-4">
                     <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-primary">
                        <span>Sync Progress</span>
                        <span>{progress}%</span>
                     </div>
                     <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${progress}%` }} className="h-full bg-primary" />
                     </div>
                     <button className="w-full py-4 bg-primary text-white hover:bg-white hover:text-black rounded-2xl shadow-[0_10px_30px_rgba(75,74,254,0.3)] font-bold transition-all text-sm flex items-center justify-center gap-2 uppercase tracking-widest">
                        Resume Audit <ChevronRight className="w-4 h-4" />
                     </button>
                  </div>
               ) : status === 'completed' ? (
                  <button className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 font-bold transition-all text-xs flex items-center justify-center gap-2 uppercase tracking-widest group-hover:border-safe/40 group-hover:text-safe">
                     Review Findings <ChevronRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
                  </button>
               ) : (
                  <button disabled className="w-full py-4 bg-white/5 rounded-2xl border border-white/10 font-bold text-gray-600 grayscale flex items-center justify-center gap-2 uppercase tracking-widest cursor-not-allowed">
                     <Lock className="w-4 h-4" /> Locked Path
                  </button>
               )}
            </div>
         </CrystalCard>
      </motion.div>
   );
}

// --- MAIN ACADEMY PAGE ---

export default function Learn() {
   const scrollToModules = () => {
      const el = document.getElementById('academy-modules');
      if (el) {
         el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
   };

   return (
      <div className="max-w-7xl mx-auto space-y-16 md:space-y-24 pb-32 pt-8 md:pt-16 px-4 md:px-8">

         {/* 1. HERO SECTION (RPG UPGRADE) */}
         <section className="relative rounded-[3rem] md:rounded-[4rem] overflow-hidden group min-h-[500px] flex items-center">
            {/* Background Animations */}
            <div className="absolute inset-0 bg-[#0A0F1E]" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-accent-pink/5 z-0" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />

            {/* Neural Backdrop Orbs */}
            <motion.div
               animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
               transition={{ duration: 10, repeat: Infinity }}
               className="absolute top-0 right-[20%] w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"
            />

            <div className="relative z-10 w-full p-8 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
               <div className="max-w-3xl space-y-8">
                  <div className="flex flex-col md:flex-row items-center gap-4">
                     <span className="bg-primary/20 text-primary text-[10px] font-bold px-5 py-2 rounded-full uppercase tracking-[0.3em] inline-block border border-primary/20 backdrop-blur-xl">
                        Neural Academy Core
                     </span>
                     <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5">
                        <Activity className="w-3 h-3 text-safe" />
                        Live Network Training
                     </div>
                  </div>

                  <h1 className="text-4xl md:text-8xl font-bold font-outfit uppercase tracking-tighter leading-none text-white">
                     Master The <br /> <span className="text-accent-cyan italic">Observable</span>.
                  </h1>

                  <p className="text-base md:text-2xl text-gray-400 leading-relaxed font-medium max-w-2xl">
                     Level up your Risk Intelligence through real-world simulations and decentralized auditing protocols.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                     <button 
                        onClick={scrollToModules}
                        className="w-full sm:w-auto bg-primary text-white font-bold py-5 px-12 rounded-[2rem] shadow-[0_15px_40px_rgba(75,74,254,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 text-sm md:text-base uppercase tracking-widest"
                     >
                        Resume Training <ChevronRight className="w-5 h-5" />
                     </button>
                     <div className="flex items-center gap-4 p-4 px-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl">
                        <div className="w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center">
                           <Star className="w-5 h-5 text-warning fill-warning" />
                        </div>
                        <div>
                           <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Global Rank</div>
                           <div className="text-sm font-bold font-outfit text-white">#1,242 TOP 2%</div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="relative">
                  {/* The Mascot */}
                  <motion.div
                     animate={{
                        y: [0, -25, 0],
                        rotate: [0, 3, -3, 0]
                     }}
                     transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                     className="w-56 h-56 md:w-96 md:h-96 relative z-10"
                  >
                     <Image src="/assets/chara.png" alt="Academy Icon" fill className="object-contain filter drop-shadow-[0_0_80px_rgba(75,74,254,0.3)]" />
                  </motion.div>

                  {/* Floating Level HUD Component */}
                  <LevelHUD />
               </div>
            </div>
         </section>

         {/* 2. PROGRESS MAP (Neural Path Visualization) */}
         <section id="academy-modules" className="relative">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6 relative z-10">
               <div className="space-y-4 text-center md:text-left">
                  <h2 className="text-3xl md:text-5xl font-bold font-outfit flex items-center justify-center md:justify-start gap-4 uppercase tracking-tighter underline underline-offset-[12px] decoration-primary decoration-8">
                     <Layers className="w-10 h-10 text-primary" /> Intelligence Path
                  </h2>
                  <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">Follow the neural path to unlock advanced scanning protocols</p>
               </div>

               <div className="flex flex-wrap justify-center gap-4">
                  {[
                     { label: "NOVICE", active: true },
                     { label: "OBSERVER", active: false },
                     { label: "SAGE", active: false },
                     { label: "ORACLE", active: false }
                  ].map((rank, i) => (
                     <div key={i} className={`px-4 py-2 rounded-full border text-[9px] font-bold tracking-widest uppercase transition-all ${rank.active ? 'bg-primary border-primary text-white shadow-[0_0_15px_rgba(75,74,254,0.4)]' : 'bg-white/5 border-white/10 text-gray-600'
                        }`}>
                        {rank.label}
                     </div>
                  ))}
               </div>
            </div>

            {/* BACKGROUND NEURAL CONNECTIONS (SVG Animation) */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] z-0 hidden lg:block opacity-20 overflow-hidden">
               <motion.div
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full bg-gradient-to-r from-transparent via-primary to-transparent"
               />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 relative z-10">
               <AcademyModule
                  title="Rug Pull Anatomy"
                  desc="Identify visual and technical red flags: renounced contracts and insider distribution logic."
                  icon={ShieldQuestion}
                  status="completed"
                  glowColor="rgba(0, 208, 132, 0.2)"
                  xp="800 XP"
               />

               <AcademyModule
                  title="Tokenomics 101"
                  desc="Understanding supply mechanics, fair launches, and long-term inflation models for sustainable growth."
                  icon={Target}
                  status="active"
                  progress={66}
                  glowColor="rgba(75, 74, 254, 0.2)"
                  xp="1,200 XP"
               />

               <AcademyModule
                  title="Advanced Sniping"
                  desc="Learn to spot bot activities and automated liquidity snipers that frontrun moves for unfair advantage."
                  icon={Wind}
                  status="locked"
                  xp="2,500 XP"
               />
            </div>
         </section>

         {/* 3. REWARDS & BADGE VAULT */}
         <section className="bg-black/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] md:rounded-[5rem] p-8 md:p-20 relative overflow-hidden group">
            {/* Prismatic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-pink/5 via-transparent to-primary/5 opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-accent-pink/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="flex flex-col items-center gap-6 mb-16 md:mb-24 text-center relative z-10">
               <div className="w-16 h-16 bg-accent-pink/20 rounded-[2rem] flex items-center justify-center border border-accent-pink/30 shadow-[0_0_30px_rgba(255,86,164,0.2)]">
                  <Award className="w-8 h-8 text-accent-pink" />
               </div>
               <h2 className="text-4xl md:text-6xl font-bold font-outfit uppercase tracking-tighter px-4">
                  Intelligence <span className="text-accent-pink italic">Vault</span>
               </h2>
               <p className="text-gray-500 font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs">Collect specialized nodes to level up your global profile</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 relative z-10">
               {[
                  { name: "Scam Slayer", earned: true, asset: "/assets/ss.png", color: "#00D084" },
                  { name: "Pepe Guard", earned: true, asset: "/assets/pg.png", color: "#4B4AFE" },
                  { name: "Whale Watch", earned: false, asset: "/assets/wh.png", color: "#FFA500" },
                  { name: "Integrity Lead", earned: false, asset: "/assets/il.png", color: "#00E5FF" },
               ].map((badge, idx) => (
                  <motion.div
                     key={idx}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: idx * 0.1 }}
                     className="flex flex-col items-center gap-8 group/badge"
                  >
                     {/* The Pedestal */}
                     <div className="relative">
                        <div className={`w-36 h-36 md:w-52 md:h-52 rounded-full flex items-center justify-center relative transition-all duration-700 group-hover/badge:scale-110 ${badge.earned
                              ? 'bg-gradient-to-b from-white/5 to-transparent border-2 border-accent-pink shadow-[0_20px_60px_rgba(255,86,164,0.1)]'
                              : 'bg-white/5 border border-white/5 grayscale saturate-50 opacity-40'
                           }`}>
                           {/* Decorative Concentric Rings */}
                           <div className="absolute inset-4 border border-white/5 rounded-full animate-[spin_10s_linear_infinite]" />
                           <div className="absolute inset-8 border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

                           <div className="p-10 w-full h-full relative cursor-pointer">
                              <Image src={badge.asset} alt={badge.name} fill className={`object-contain transition-all duration-700 ${badge.earned ? 'drop-shadow-[0_0_40px_rgba(255,255,255,0.4)] group-hover/badge:rotate-12' : 'blur-[2px]'}`} />
                           </div>

                           {badge.earned && (
                              <div className="absolute -top-4 -right-4 bg-accent-pink rounded-full p-3 shadow-2xl border-4 border-[#090B14] z-20">
                                 <Star className="w-5 h-5 text-white fill-white animate-pulse" />
                              </div>
                           )}

                           {/* Locked Overlay */}
                           {!badge.earned && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full backdrop-blur-[2px]">
                                 <Lock className="w-8 h-8 text-gray-500" />
                              </div>
                           )}
                        </div>

                        {/* Pedestal Base Glow */}
                        <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-2 rounded-full blur-[10px] ${badge.earned ? 'bg-accent-pink/40' : 'bg-white/10'
                           }`} />
                     </div>

                     <div className="space-y-3 text-center">
                        <span className={`text-xs md:text-sm font-bold tracking-[0.3em] uppercase block transition-colors ${badge.earned ? 'text-white' : 'text-gray-600'}`}>
                           {badge.name}
                        </span>
                        <div className="flex justify-center gap-1">
                           {[1, 2, 3, 4, 5].map(s => (
                              <div key={s} className={`w-1 h-1 rounded-full ${s <= (badge.earned ? 5 : 0) ? 'bg-accent-pink' : 'bg-white/10'}`} />
                           ))}
                        </div>
                     </div>
                  </motion.div>
               ))}
            </div>
         </section>

      </div>
   );
}
