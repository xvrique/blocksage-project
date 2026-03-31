"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Star, ShieldCheck, Gamepad2, ChevronUp, ChevronDown } from "lucide-react";
import Image from "next/image";

const leaderboardData = [
   { rank: 1, user: "0xCryptoWhale", points: "142,500", badges: 12, change: "up" },
   { rank: 2, user: "SageApprentice", points: "135,200", badges: 10, change: "same" },
   { rank: 3, user: "DegenSlayer", points: "128,950", badges: 8, change: "up" },
   { rank: 4, user: "AlphaSeeker", points: "110,400", badges: 7, change: "down" },
   { rank: 5, user: "BlockSage_Intern", points: "95,000", badges: 5, change: "up" },
];

export default function Leaderboard() {
   return (
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 pt-24 md:pt-28 pb-28 space-y-16 md:space-y-20">

         {/* ─── Hero & Top 3 Podium ─── */}
         <section className="text-center space-y-10">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="space-y-4"
            >
               <Trophy className="w-14 h-14 md:w-16 md:h-16 text-warning mx-auto drop-shadow-[0_0_30px_rgba(255,165,0,0.4)] mb-4" />
               <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-outfit uppercase tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-primary/50">
                  Hall of Integrity
               </h1>
               <p className="text-sm md:text-base text-gray-400 max-w-lg mx-auto font-medium leading-relaxed">
                  Rankings of our most elite risk guardians. Secure the network to earn $BLS multipliers.
               </p>
            </motion.div>

            {/* Podium */}
            <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-6 md:gap-5 mt-12 md:mt-16 h-auto md:h-72">
               {/* Rank 2 */}
               <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="w-full max-w-[240px] md:w-56 flex flex-col items-center relative order-2 md:order-1"
               >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#12152a] border-[3px] border-gray-400/40 z-10 overflow-hidden mb-[-1.5rem] md:mb-[-2rem] relative shadow-lg p-0.5">
                     <div className="w-full h-full rounded-full overflow-hidden bg-gray-900/50">
                        <img src="https://api.dicebear.com/7.x/notionists/svg?seed=SageApprentice" alt="Rank 2" />
                     </div>
                     <div className="absolute top-0 right-0 px-1.5 py-0.5 bg-gray-400 rounded-full text-[8px] font-bold text-gray-900">2ND</div>
                  </div>
                  <div className="w-full bg-white/[0.03] border border-white/[0.06] h-28 md:h-40 rounded-t-[2rem] flex flex-col items-center justify-end pb-5 md:pb-6">
                     <div className="text-sm md:text-base font-bold text-gray-300 uppercase tracking-tight">SageApprentice</div>
                     <div className="text-xs font-bold text-primary font-mono">{leaderboardData[1].points} <span className="text-[9px] opacity-50">PTS</span></div>
                  </div>
               </motion.div>

               {/* Rank 1 */}
               <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="w-full max-w-[280px] md:w-72 flex flex-col items-center relative z-20 group order-1 md:order-2"
               >
                  <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 w-36 h-36 pointer-events-none opacity-10 group-hover:opacity-25 transition-all duration-700">
                     <div className="w-full h-full bg-warning blur-[50px] rounded-full" />
                  </div>
                  <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-[#12152a] border-4 border-warning z-10 overflow-hidden mb-[-2rem] md:mb-[-3rem] shadow-[0_0_40px_rgba(255,165,0,0.3)] relative p-1">
                     <div className="w-full h-full rounded-full overflow-hidden bg-gray-900/50 border border-white/10">
                        <img src="https://api.dicebear.com/7.x/notionists/svg?seed=CryptoWhale" alt="Rank 1" />
                     </div>
                     <div className="absolute top-0 right-0 p-1.5 bg-warning rounded-full border-2 border-[#050812]">
                        <Star className="w-3.5 h-3.5 text-white fill-white" />
                     </div>
                  </div>
                  <div className="w-full bg-white/[0.04] border border-white/[0.1] h-40 md:h-56 rounded-t-[2.5rem] border-t-[3px] border-t-warning/40 flex flex-col items-center justify-end pb-6 md:pb-8 relative">
                     <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-warning/20 to-transparent" />
                     <div className="text-center space-y-1">
                        <div className="text-lg md:text-xl font-bold text-white flex gap-1.5 items-center justify-center font-outfit uppercase tracking-tight">
                           0xCryptoWhale <Medal className="w-4 h-4 text-warning" />
                        </div>
                        <div className="text-sm font-bold text-warning font-mono">{leaderboardData[0].points} <span className="text-[10px] opacity-50">PTS</span></div>
                        <div className="text-[8px] font-bold text-warning/60 font-mono tracking-[3px] mt-1">SUPREME ANALYST</div>
                     </div>
                  </div>
               </motion.div>

               {/* Rank 3 */}
               <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="w-full max-w-[240px] md:w-56 flex flex-col items-center relative order-3"
               >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#12152a] border-[3px] border-amber-800/40 z-10 overflow-hidden mb-[-1.5rem] md:mb-[-2rem] relative shadow-lg p-0.5">
                     <div className="w-full h-full rounded-full overflow-hidden bg-gray-900/50">
                        <img src="https://api.dicebear.com/7.x/notionists/svg?seed=DegenSlayer" alt="Rank 3" />
                     </div>
                     <div className="absolute top-0 right-0 px-1.5 py-0.5 bg-amber-800 rounded-full text-[8px] font-bold text-white">3RD</div>
                  </div>
                  <div className="w-full bg-white/[0.03] border border-white/[0.06] h-24 md:h-32 rounded-t-[2rem] flex flex-col items-center justify-end pb-5 md:pb-6">
                     <div className="text-sm md:text-base font-bold text-gray-300 uppercase tracking-tight">DegenSlayer</div>
                     <div className="text-xs font-bold text-accent-pink font-mono">{leaderboardData[2].points} <span className="text-[9px] opacity-50">PTS</span></div>
                  </div>
               </motion.div>
            </div>
         </section>

         {/* ─── Player List ─── */}
         <section className="relative z-10">
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden">
               {/* Table Header */}
               <div className="px-6 py-4 border-b border-white/[0.05] hidden md:flex items-center justify-between text-[9px] text-gray-500 uppercase tracking-[0.3em] font-mono bg-white/[0.01]">
                  <div className="flex items-center gap-10 pl-2">
                     <span className="w-8">Rank</span>
                     <span>Identity</span>
                  </div>
                  <div className="flex items-center gap-16 pr-2">
                     <span>Status</span>
                     <span className="w-24 text-right">BLS Points</span>
                  </div>
               </div>

               {/* Rows */}
               <div className="divide-y divide-white/[0.04]">
                  {leaderboardData.map((user, idx) => (
                     <motion.div
                        key={user.user}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.08 }}
                        className="flex flex-col md:flex-row items-center justify-between p-5 md:p-6 hover:bg-white/[0.02] transition-all cursor-pointer group gap-4 md:gap-0"
                     >
                        <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
                           <span className={`w-8 text-center font-bold text-lg font-mono ${idx < 3 ? 'text-primary' : 'text-gray-600'}`}>
                              {idx < 3 ? '0' + (idx + 1) : idx + 1}
                           </span>
                           <div className="flex items-center gap-4 flex-1">
                              <div className="w-11 h-11 md:w-14 md:h-14 rounded-xl overflow-hidden bg-[#12152a] border border-white/[0.06] relative p-0.5 group-hover:border-primary/40 transition-all shrink-0">
                                 <div className="w-full h-full rounded-lg overflow-hidden bg-gray-900/50">
                                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user.user}`} alt={user.user} />
                                 </div>
                                 {user.change === 'up' && <div className="absolute -bottom-1 -right-1 bg-safe/20 p-0.5 rounded-full border border-[#050812]"><ChevronUp className="w-2.5 h-2.5 text-safe" /></div>}
                                 {user.change === 'down' && <div className="absolute -bottom-1 -right-1 bg-danger/20 p-0.5 rounded-full border border-[#050812]"><ChevronDown className="w-2.5 h-2.5 text-danger" /></div>}
                              </div>
                              <div className="flex-1 min-w-0">
                                 <div className="flex items-center gap-2">
                                    <h3 className="text-base md:text-lg font-bold font-outfit text-white group-hover:text-primary transition-colors uppercase tracking-tight truncate">{user.user}</h3>
                                    {idx === 0 && <Star className="w-3.5 h-3.5 text-warning fill-warning shrink-0" />}
                                 </div>
                                 <div className="flex items-center gap-2 mt-0.5">
                                    <span className="flex items-center gap-1 text-[9px] font-medium text-gray-500 whitespace-nowrap">
                                       <ShieldCheck className="w-2.5 h-2.5 text-accent-cyan" /> {user.badges} Artifacts
                                    </span>
                                    <span className="w-0.5 h-0.5 bg-white/20 rounded-full" />
                                    <span className="text-[9px] font-medium text-gray-500 whitespace-nowrap">Lvl 4 Guardian</span>
                                 </div>
                              </div>
                           </div>
                           {/* Mobile points */}
                           <div className="md:hidden shrink-0">
                              <div className="text-base font-bold text-white font-mono">{user.points}</div>
                           </div>
                        </div>

                        <div className="flex items-center justify-between md:justify-end gap-6 md:gap-16 w-full md:w-auto border-t border-white/[0.04] pt-3 md:border-none md:pt-0">
                           <div className="flex items-center gap-2.5 text-[9px] font-medium text-gray-500">
                              <span className="md:hidden">Duel Status:</span>
                              <div className="flex items-center gap-2">
                                 <span className="hidden sm:inline">Duel Ready</span>
                                 <button className="p-2 bg-white/[0.04] rounded-lg text-primary hover:bg-primary hover:text-white transition-all"><Gamepad2 className="w-3.5 h-3.5" /></button>
                              </div>
                           </div>
                           <div className="hidden md:block w-36 text-right">
                              <div className="text-2xl font-bold font-outfit text-white mb-0.5 group-hover:text-warning transition-colors font-mono">{user.points}</div>
                              <div className="text-[8px] font-medium tracking-widest text-gray-500 flex items-center justify-end gap-1.5">
                                 <span>Observations</span>
                                 <div className="w-3.5 h-3.5 relative"><Image src="/assets/icon.png" alt="coin" fill className="object-contain" /></div>
                              </div>
                           </div>
                        </div>
                     </motion.div>
                  ))}
               </div>

               {/* Your Stats */}
               <div className="p-5 md:p-8 bg-white/[0.02] border-t border-white/[0.05] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.06] via-transparent to-transparent pointer-events-none" />
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                     <div className="flex items-center gap-5 w-full md:w-auto">
                        <div className="w-14 h-14 md:w-20 md:h-20 rounded-xl bg-primary/20 border-2 border-primary/30 p-1 flex items-center justify-center shadow-[0_0_30px_rgba(75,74,254,0.2)] shrink-0">
                           <div className="w-full h-full rounded-lg overflow-hidden bg-gray-900/50">
                              <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=4B4AFE" alt="You" />
                           </div>
                        </div>
                        <div>
                           <div className="text-[9px] font-bold text-primary mb-1 tracking-[0.3em] uppercase">My Standing</div>
                           <h3 className="text-lg md:text-2xl font-bold font-outfit text-white uppercase tracking-tight">Felix the Sage <span className="text-sm opacity-30 text-gray-500">IND-124</span></h3>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 w-full md:w-auto border-t border-white/[0.04] pt-4 md:border-none md:pt-0">
                        <div>
                           <div className="text-[9px] font-medium text-gray-500 uppercase tracking-widest mb-1">Weekly Rank</div>
                           <div className="text-xl font-bold text-white flex items-center gap-1.5 font-mono">#712 <ChevronUp className="w-3.5 h-3.5 text-safe" /></div>
                        </div>
                        <div className="border-l border-white/[0.06] pl-6">
                           <div className="text-[9px] font-medium text-gray-500 uppercase tracking-widest mb-1">Pending BLS</div>
                           <div className="text-xl font-bold text-warning flex items-center gap-1.5 font-mono">250 <Star className="w-3.5 h-3.5 fill-warning" /></div>
                        </div>
                        <div className="hidden lg:block">
                           <button className="bg-primary hover:bg-white hover:text-black transition-all font-bold px-8 py-3.5 rounded-xl shadow-lg uppercase tracking-wider text-xs">
                              View Details
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

      </div>
   );
}
