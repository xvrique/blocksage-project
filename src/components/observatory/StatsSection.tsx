"use client";

import { motion } from "framer-motion";
import { container, item } from "./UIElements";
import { stats } from "./data";
import { AnimatedCounter } from "@/components/AnimatedCounter";

export function StatsSection() {
   return (
      <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 lg:px-12">
         <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
         >
            {stats.map((stat) => (
               <motion.div
                  key={stat.label}
                  variants={item}
                  whileHover={{ y: -4 }}
                  className="rounded-[28px] border border-white/[0.06] bg-white/[0.03] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl"
               >
                  <div className="mb-2 text-3xl font-black tracking-tight text-white md:text-4xl">
                     <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-[11px] font-black uppercase tracking-[0.22em] text-white/38">{stat.label}</div>
               </motion.div>
            ))}
         </motion.div>
      </section>
   );
}
