"use client";

import { motion } from "framer-motion";
import { softReveal, SectionTag, item } from "./UIElements";
import { PulseFeed } from "@/components/PulseFeed";
import { GlobalThreatMap } from "@/components/GlobalThreatMap";
import { PortfolioShield } from "@/components/PortfolioShield";
import { useSystemStatus } from "@/hooks/useSystemStatus";

export function DashboardSection() {
   const { globalLoad, oracleSync } = useSystemStatus();

   return (
      <section className="mx-auto max-w-[1360px] px-6 py-20 md:px-10 md:py-28 lg:px-12">
         <motion.div
            variants={softReveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
         >
            <div>
               <SectionTag label="Command overview" />
               <h2 className="mt-6 text-4xl font-black leading-[0.95] tracking-[-0.05em] text-white md:text-5xl lg:text-6xl">
                  One dashboard. Better rhythm. Clearer decisions.
               </h2>
            </div>
            <div className="inline-flex items-center gap-6 rounded-[28px] border border-white/[0.06] bg-white/[0.03] px-6 py-5 backdrop-blur-xl">
               <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.22em] text-white/35">Global load</div>
                  <div className="mt-1 text-xl font-black text-white">{globalLoad} GB/s</div>
               </div>
               <div className="h-10 w-px bg-white/10" />
               <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.22em] text-white/35">Oracle sync</div>
                  <div className="mt-1 text-xl font-black text-emerald-300">{oracleSync} ms</div>
               </div>
            </div>
         </motion.div>

         <div className="grid gap-6 lg:grid-cols-12">
            <motion.div variants={item} initial="hidden" whileInView="show" viewport={{ once: true }} className="lg:col-span-3">
               <PortfolioShield />
            </motion.div>
            <motion.div variants={item} initial="hidden" whileInView="show" viewport={{ once: true }} className="lg:col-span-6">
               <GlobalThreatMap />
            </motion.div>
            <motion.div variants={item} initial="hidden" whileInView="show" viewport={{ once: true }} className="lg:col-span-3">
               <PulseFeed />
            </motion.div>
         </div>
      </section>
   );
}
