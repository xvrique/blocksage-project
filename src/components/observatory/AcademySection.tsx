"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, Star, Layers3, ArrowRight, CheckCircle2 } from "lucide-react";
import { softReveal, SectionTag, MagneticButton } from "./UIElements";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { useRouter } from "next/navigation";

export function AcademySection() {
   const router = useRouter();

   const scrollToTerminal = () => {
      const el = document.getElementById('pulse-feed');
      if (el) {
         el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
   };

   return (
      <>
         {/* ─── Training Section ─── */}
         <section className="mx-auto max-w-[1240px] px-6 py-20 md:px-10 md:py-28 lg:px-12">
            <motion.div
               variants={softReveal}
               initial="hidden"
               whileInView="show"
               viewport={{ once: true, margin: "-80px" }}
               className="relative overflow-hidden rounded-[36px] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(108,99,255,0.12),rgba(255,255,255,0.03))] px-7 py-10 shadow-[0_20px_90px_rgba(0,0,0,0.28)] backdrop-blur-2xl md:px-12 md:py-14"
            >
               <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_45%)]" />
               <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative mx-auto aspect-square w-full max-w-[460px]">
                     <motion.div
                        animate={{ y: [0, -12, 0], rotate: [0, 1.5, 0, -1.5, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="relative h-full w-full"
                     >
                        <Image src="/assets/read.png" alt="Guardian academy" fill className="object-contain drop-shadow-[0_24px_90px_rgba(108,99,255,0.22)]" />
                     </motion.div>
                     <div className="absolute left-0 top-10 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-emerald-300 backdrop-blur-xl">
                        Training linked
                     </div>
                     <div className="absolute bottom-10 right-0 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/70 backdrop-blur-xl">
                        Level 3 guardian
                     </div>
                  </div>

                  <div className="space-y-7 text-center lg:text-left">
                     <SectionTag label="Sage mastery path" />
                     <h2 className="text-4xl font-black leading-[0.95] tracking-[-0.05em] text-white md:text-6xl">
                        Learn the system, then use it with confidence.
                     </h2>
                     <p className="max-w-[560px] text-base leading-8 text-white/58 md:text-lg">
                        Training should feel motivating and premium. This section uses fewer gimmicks, better spacing, and richer depth so the mascot supports the story instead of carrying the whole page.
                     </p>
                     <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
                        <MagneticButton variant="primary" onClick={() => router.push('/learn')}>
                           Enter academy <ChevronRight className="h-4 w-4" />
                        </MagneticButton>
                        <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 backdrop-blur-xl">
                           <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-400/12 text-amber-300">
                              <Star className="h-5 w-5 fill-current" />
                           </div>
                           <div className="text-left">
                              <div className="text-[10px] font-black uppercase tracking-[0.22em] text-white/35">Global rank</div>
                              <div className="text-sm font-semibold text-white">#<AnimatedCounter value="1242" /> · Master</div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>
         </section>

         {/* ─── Bottom CTA ─── */}
         <section className="mx-auto max-w-[1240px] px-6 pb-20 md:px-10 md:pb-28 lg:px-12">
            <motion.div
               variants={softReveal}
               initial="hidden"
               whileInView="show"
               viewport={{ once: true, margin: "-80px" }}
               className="relative overflow-hidden rounded-[36px] border border-white/[0.06] bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(108,99,255,0.12),rgba(255,255,255,0.03))] px-8 py-14 text-center shadow-[0_20px_80px_rgba(0,0,0,0.26)] backdrop-blur-2xl md:px-14 md:py-20"
            >
               <motion.div
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_55%)]"
                  animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.03, 1] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               />

               <div className="relative z-10 mx-auto max-w-[760px]">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[28px] border border-white/10 bg-white/10 text-white shadow-[0_18px_60px_rgba(255,255,255,0.08)]">
                     <Layers3 className="h-9 w-9" />
                  </div>
                  <h2 className="text-4xl font-black leading-[0.95] tracking-[-0.05em] text-white md:text-6xl">
                     Make the product feel premium the moment it loads.
                  </h2>
                  <p className="mx-auto mt-5 max-w-[620px] text-base leading-8 text-white/60 md:text-lg">
                     Clean motion. Better pacing. Stronger hierarchy. The goal is not more effects. The goal is better feeling.
                  </p>

                  <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                     <MagneticButton variant="primary" onClick={scrollToTerminal}>
                        Open terminal <ArrowRight className="h-4 w-4" />
                     </MagneticButton>
                     <MagneticButton variant="secondary">
                        <CheckCircle2 className="h-4 w-4" /> Whitepaper
                     </MagneticButton>
                  </div>
               </div>
            </motion.div>
         </section>
      </>
   );
}
