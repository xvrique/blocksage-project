"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Brain, Cpu, Network, Zap, Activity, Info, ChevronRight, Search, ShieldCheck, Database, Radio, Wind, Eye } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CrystalCard } from "@/components/CrystalCard";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { CheckCircle, ShieldAlert } from "lucide-react";

const mockThoughts = [
   { id: 1, text: "Analyzing $SOL contract: No proxy detected. Liquidity locked (98.2%)", confidence: 99, risk: "safe", time: "JUST NOW" },
   { id: 2, text: "$PEPE variant identified: High similarity to known rug-pull signature #842", confidence: 87, risk: "danger", time: "2S AGO" },
   { id: 3, text: "Mempool Spike: Institutional volume detected on $ETH/USDC pairing", confidence: 92, risk: "neutral", time: "15S AGO" },
   { id: 4, text: "Neural Sync: Scanning 14.5k nodes for data-integrity...", confidence: 100, risk: "info", time: "1M AGO" },
   { id: 5, text: "Anomalous Transaction: Large wallet inflow from Tornado Cash detected", confidence: 95, risk: "high", time: "2M AGO" },
];

function NeuralNode({ x, y, delay = 0 }: { x: string, y: string, delay?: number }) {
   return (
      <motion.div
         initial={{ scale: 0, opacity: 0 }}
         animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.4] }}
         transition={{ duration: 2, delay, repeat: Infinity, repeatType: "reverse" }}
         style={{ left: x, top: y }}
         className="absolute w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(75,74,254,0.8)] z-10"
      />
   );
}

function ConnectionLine({ x1, y1, x2, y2, delay = 0 }: { x1: string, y1: string, x2: string, y2: string, delay?: number }) {
   return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
         <motion.line
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="rgba(75, 74, 254, 0.2)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
            transition={{ duration: 3, delay, repeat: Infinity }}
         />
      </svg>
   );
}

export default function BrainPage() {
   const [activeMode, setActiveMode] = useState("standard");
   const [thoughts, setThoughts] = useState(mockThoughts);
   const [metrics, setMetrics] = useState({
      processedData: 1.2,
      totalInsights: 842000,
      integrityLock: 99.9
   });
   const [isThinking, setIsThinking] = useState(false);

   const { connected, publicKey } = useWallet();
   const { setVisible } = useWalletModal();
   const [isSyncing, setIsSyncing] = useState(false);
   const [isSynced, setIsSynced] = useState(false);

   const handleSync = async () => {
      if (!connected) {
         setVisible(true);
         return;
      }

      setIsSyncing(true);
      // Simulate real neural synchronization
      await new Promise(r => setTimeout(r, 2000));
      setIsSyncing(false);
      setIsSynced(true);
      
      // Flash the UI to show impact
      setIsThinking(true);
      setTimeout(() => setIsThinking(false), 1500);
   };

   // Real-time Thought Stream
   useEffect(() => {
      const interval = setInterval(async () => {
         try {
            const res = await fetch('/api/brain/insights');
            const newThought = await res.json();
            
            setIsThinking(true);
            setTimeout(() => {
               setThoughts(prev => [newThought, ...prev.slice(0, 7)]);
               setIsThinking(false);
            }, 800);
         } catch (err) {
            console.error("Brain sync error:", err);
         }
      }, 6000);

      return () => clearInterval(interval);
   }, []);

   // Real-time Metrics
   useEffect(() => {
      const interval = setInterval(async () => {
         try {
            const res = await fetch('/api/brain/metrics');
            const data = await res.json();
            setMetrics(prev => ({
               ...prev,
               processedData: data.processedData,
               totalInsights: data.totalInsights,
               integrityLock: data.integrityLock
            }));
         } catch (err) {
            console.error("Metric sync error:", err);
         }
      }, 4000);

      return () => clearInterval(interval);
   }, []);

   return (
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 space-y-16 md:space-y-20 pb-28 pt-24 md:pt-28">

         {/* 1. NEURAL HUB: Hero Section */}
         <section className="relative min-h-[500px] md:min-h-[700px] flex flex-col items-center justify-center text-center overflow-hidden rounded-[3rem] border border-white/5 bg-gradient-to-b from-primary/5 via-transparent to-transparent">
            
            {/* Neural Background Animation */}
            <div className="absolute inset-0 z-0">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(75,74,254,0.1),transparent_70%)]" />
               <NeuralNode x="20%" y="30%" delay={0.2} />
               <NeuralNode x="80%" y="25%" delay={1.4} />
               <NeuralNode x="35%" y="70%" delay={0.8} />
               <NeuralNode x="65%" y="75%" delay={2.1} />
               <NeuralNode x="50%" y="15%" delay={1.1} />
               
               <ConnectionLine x1="20%" y1="30%" x2="50%" y2="15%" delay={0.5} />
               <ConnectionLine x1="80%" y1="25%" x2="50%" y2="15%" delay={1.2} />
               <ConnectionLine x1="20%" y1="30%" x2="35%" y2="70%" delay={1.8} />
               <ConnectionLine x1="80%" y1="25%" x2="65%" y2="75%" delay={0.3} />
               <ConnectionLine x1="35%" y1="70%" x2="65%" y2="75%" delay={2.5} />
               <ConnectionLine x1="50%" y1="50%" x2="20%" y2="30%" delay={1} />
               <ConnectionLine x1="50%" y1="50%" x2="80%" y2="25%" delay={0.8} />
            </div>

            <div className="relative z-10 space-y-8 max-w-4xl px-6">
               <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                     opacity: 1, 
                     scale: 1,
                     y: [0, -10, 0]
                  }}
                  transition={{ 
                     opacity: { duration: 1 },
                     scale: { duration: 1 },
                     y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="w-32 h-32 md:w-48 md:h-48 mx-auto relative mb-4"
               >
                  <div className={`absolute inset-[-20%] bg-primary/20 blur-[60px] rounded-full transition-all duration-1000 ${isThinking ? 'opacity-100 scale-125 bg-accent-pink/30' : 'opacity-40'}`} />
                  <div className="w-full h-full bg-[#0A0F1E] rounded-full border-4 border-primary/40 shadow-[0_0_60px_rgba(75,74,254,0.4)] flex items-center justify-center overflow-hidden">
                     <motion.div
                        animate={{ 
                           scale: isThinking ? [1, 1.2, 1] : [1, 1.1, 1],
                           rotate: isThinking ? [0, 10, -10, 0] : [0, 5, -5, 0]
                        }}
                        transition={{ duration: isThinking ? 0.5 : 8, repeat: Infinity }}
                        className="w-3/4 h-3/4"
                     >
                        <Brain className={`w-full h-full transition-colors duration-500 ${isThinking ? 'text-accent-pink' : 'text-primary'}`} />
                     </motion.div>
                  </div>
                  
                  {/* Floating Data Tags */}
                  <motion.div 
                     animate={{ y: [0, -10, 0] }}
                     transition={{ duration: 4, repeat: Infinity }}
                     className="absolute -top-4 -right-8 bg-accent-cyan/10 backdrop-blur-md border border-accent-cyan/20 px-3 py-1 rounded-full flex items-center gap-2"
                  >
                     <Zap className="w-3 h-3 text-accent-cyan" />
                     <span className="text-[10px] font-bold text-accent-cyan tracking-widest uppercase">Sync 99%</span>
                  </motion.div>
               </motion.div>

               <div className="space-y-6">
                  <h1 className="text-3xl md:text-5xl lg:text-7xl font-black font-outfit uppercase tracking-tighter leading-none text-white">
                     CYBERNETIC <br /> <span className="text-primary italic">INTELLIGENCE</span>
                  </h1>
                  <p className="text-sm md:text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed uppercase tracking-wider">
                     The Sage's decentralized neural network scanning millions of transactions to preserve market integrity.
                  </p>
               </div>

               <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full">
                     <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Neural Load</span>
                     <div className="w-24 h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                           animate={{ width: isThinking ? ["40%", "80%", "60%"] : ["20%", "45%", "35%"] }}
                           transition={{ duration: 5, repeat: Infinity }}
                           className="h-full bg-accent-cyan shadow-[0_0_10px_rgba(0,229,255,0.5)]"
                        />
                     </div>
                  </div>
                  <div className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full">
                     <div className={`w-2 h-2 rounded-full animate-pulse transition-colors duration-300 ${isThinking ? 'bg-accent-pink shadow-[0_0_12px_#ff56a4]' : 'bg-safe shadow-[0_0_8px_green]'}`} />
                     <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{isThinking ? 'Processing Insight...' : 'Cognitive Link: Active'}</span>
                  </div>
               </div>
            </div>
         </section>

         {/* 2. COGNITIVE METRICS */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <CrystalCard glowColor="rgba(75, 74, 254, 0.2)" className="flex flex-col items-center text-center p-10">
               <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center mb-6 border border-primary/20">
                  <Database className="w-8 h-8 text-primary" />
               </div>
               <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] mb-2">Processed Data</span>
               <div className="text-4xl md:text-5xl font-bold font-outfit mb-2 text-white">
                  {metrics.processedData.toFixed(2)} <span className="text-xl">TB</span>
               </div>
               <p className="text-xs text-gray-400 font-medium">Verified contract bytecode analyzed across 14 chains.</p>
            </CrystalCard>

            <CrystalCard glowColor="rgba(0, 229, 255, 0.2)" className="flex flex-col items-center text-center p-10">
               <div className="w-16 h-16 bg-accent-cyan/10 rounded-3xl flex items-center justify-center mb-6 border border-accent-cyan/20">
                  <Radio className="w-8 h-8 text-accent-cyan" />
               </div>
               <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] mb-2">Total Insights</span>
               <div className="text-4xl md:text-5xl font-bold font-outfit mb-2 text-accent-cyan">
                  {(metrics.totalInsights / 1000).toFixed(1)} <span className="text-xl text-accent-cyan/50">K</span>
               </div>
               <p className="text-xs text-gray-400 font-medium">Real-time alerts generated by the neural core.</p>
            </CrystalCard>

            <CrystalCard glowColor="rgba(255, 86, 164, 0.2)" className="flex flex-col items-center text-center p-10">
               <div className="w-16 h-16 bg-accent-pink/10 rounded-3xl flex items-center justify-center mb-6 border border-accent-pink/20">
                  <ShieldCheck className="w-8 h-8 text-accent-pink" />
               </div>
               <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] mb-2">Integrity Lock</span>
               <div className="text-4xl md:text-5xl font-bold font-outfit mb-2 text-accent-pink">
                  {metrics.integrityLock.toFixed(1)} <span className="text-xl">%</span>
               </div>
               <p className="text-xs text-gray-400 font-medium">Uptime of decentralized auditing nodes.</p>
            </CrystalCard>
         </div>

         {/* 3. THOUGHT STREAM & OVERRIDE */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Thought Stream */}
            <div className="lg:col-span-2 space-y-6">
               <div className="flex items-center justify-between px-4">
                  <h2 className="text-xl md:text-2xl font-bold font-outfit flex items-center gap-3 uppercase tracking-tighter text-white">
                     <Activity className="w-6 h-6 text-primary" /> The Thought Stream
                  </h2>
                  <div className="flex items-center gap-2">
                     <span className="w-2 h-2 bg-primary rounded-full animate-ping" />
                     <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Live Analysis</span>
                  </div>
               </div>

               <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                     {thoughts.map((thought, idx) => (
                        <motion.div
                           key={thought.id}
                           layout
                           initial={{ opacity: 0, x: -20, scale: 0.95 }}
                           animate={{ opacity: 1, x: 0, scale: 1 }}
                           exit={{ opacity: 0, scale: 0.9, y: 10 }}
                           className={`bg-white/[0.03] backdrop-blur-xl border p-5 md:p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group hover:bg-white/[0.05] transition-all ${
                              idx === 0 ? 'border-primary/30 bg-primary/5' : 'border-white/5'
                           }`}
                        >
                           <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${
                                 thought.risk === 'danger' ? 'bg-danger/10 border-danger/20 text-danger' : 
                                 thought.risk === 'safe' ? 'bg-safe/10 border-safe/20 text-safe' : 
                                 'bg-primary/10 border-primary/20 text-primary'
                              }`}>
                                 {thought.risk === 'danger' ? <ShieldCheck className="rotate-180" /> : <ShieldCheck />}
                              </div>
                              <div className="space-y-1">
                                 <p className="text-sm md:text-base text-gray-300 font-medium leading-tight">{thought.text}</p>
                                 <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{thought.time}</span>
                                    <span className="w-1 h-1 bg-white/10 rounded-full" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Confidence: {thought.confidence}%</span>
                                 </div>
                              </div>
                           </div>
                           <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100 text-white">
                              View Audit
                           </button>
                        </motion.div>
                     ))}
                  </AnimatePresence>
               </div>
            </div>

            {/* Protocol Override */}
            <div className="space-y-6">
               <h2 className="text-xl md:text-2xl font-bold font-outfit flex items-center gap-3 uppercase tracking-tighter px-4 text-white">
                  <Wind className="w-6 h-6 text-accent-cyan" /> Brain Modes
               </h2>

               <div className="space-y-4">
                  {[
                     { id: "standard", name: "Standard Scan", desc: "Balanced neural sensitivity", icon: Zap, color: "primary" },
                     { id: "aggressive", name: "Deep Analysis", desc: "High-sensitivity threat detection", icon: Search, color: "accent-pink" },
                     { id: "silent", name: "Institutional", desc: "Silent monitoring of large wallets", icon: Eye, color: "accent-cyan" },
                  ].map((mode) => (
                     <button
                        key={mode.id}
                        onClick={() => setActiveMode(mode.id)}
                        className={`w-full p-6 rounded-[2rem] border transition-all text-left flex items-center justify-between group ${
                           activeMode === mode.id 
                              ? `bg-${mode.color}/10 border-${mode.color}/40 text-white shadow-[0_10px_30px_rgba(0,0,0,0.3)]` 
                              : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/10 border-white/5'
                        }`}
                     >
                        <div className="flex items-center gap-4">
                           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${
                              activeMode === mode.id ? `bg-${mode.color}/20 min-h-[48px] border-${mode.color}/40` : 'bg-white/5 border-white/10'
                           }`}>
                              <mode.icon className={`w-6 h-6 ${activeMode === mode.id ? 'text-white' : 'text-gray-600'}`} />
                           </div>
                           <div>
                              <div className={`text-sm font-bold uppercase tracking-widest ${activeMode === mode.id ? 'text-white' : 'text-gray-500'}`}>
                                 {mode.name}
                              </div>
                              <div className="text-[10px] font-medium opacity-60">{mode.desc}</div>
                           </div>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${activeMode === mode.id ? 'bg-primary animate-pulse' : 'bg-white/10'}`} />
                     </button>
                  ))}
               </div>

               <CrystalCard className="p-8 text-center bg-primary/5 border-primary/20">
                  {isSynced ? (
                     <CheckCircle className="w-10 h-10 text-safe mx-auto mb-4" />
                  ) : connected ? (
                     <Zap className="w-10 h-10 text-primary mx-auto mb-4 animate-pulse" />
                  ) : (
                     <ShieldAlert className="w-10 h-10 text-warning mx-auto mb-4" />
                  )}
                  
                  <h3 className="text-lg font-bold font-outfit uppercase tracking-tighter mb-2 text-white">
                     {isSynced ? 'Synergy Active' : 'Neural Synergy'}
                  </h3>
                  <p className="text-xs text-gray-400 mb-6">
                     {isSynced 
                        ? `Identity ${publicKey?.toBase58().slice(0, 6)} fully synced with neural core.` 
                        : 'Connect your wallet to sync your personal Sage Avatar with the global Neural Core.'}
                  </p>
                  
                  <button 
                     onClick={handleSync}
                     disabled={isSyncing || isSynced}
                     className={`w-full py-4 rounded-2xl uppercase tracking-widest text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        isSyncing ? 'bg-white/10 text-white/40 cursor-wait' :
                        isSynced ? 'bg-safe/20 text-safe border border-safe/40' :
                        'bg-primary text-white hover:shadow-[0_10px_30px_rgba(75,74,254,0.4)]'
                     }`}
                  >
                     {isSyncing && <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><Zap className="w-3 h-3" /></motion.div>}
                     {isSyncing ? 'Synchronizing...' : isSynced ? 'Identity Integrated' : connected ? 'Sync Identity Now' : 'Connect to Sync'}
                  </button>
               </CrystalCard>
            </div>

         </div>

      </div>
   );
}


