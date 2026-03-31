"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { softReveal, container, item, SectionTag } from "./UIElements";
import { features } from "./data";

export function FeaturesSection() {
   return (
      <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-28 lg:px-12">
         <motion.div
            variants={softReveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-14 text-center"
         >
            <SectionTag label="Designed to feel better" />
            <h2 className="mt-6 text-4xl font-black leading-tight tracking-[-0.04em] text-white md:text-5xl">
               A stronger product look starts with calmer interaction.
            </h2>
            <p className="mx-auto mt-5 max-w-[760px] text-base leading-8 text-white/56 md:text-lg">
               The visual system below keeps the cyber tone, but removes the overly synthetic feel through softer spacing, cleaner grouping, and motion that supports focus.
            </p>
         </motion.div>

         <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-6 md:grid-cols-3"
         >
            {features.map((feature) => {
               const Icon = feature.icon;
               return (
                  <motion.div
                     key={feature.title}
                     variants={item}
                     whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
                     className="group relative overflow-hidden rounded-[30px] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] p-7 shadow-[0_18px_60px_rgba(0,0,0,0.2)] backdrop-blur-2xl"
                  >
                     <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)] opacity-70" />
                     <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                        <Icon className="h-5 w-5" />
                     </div>
                     <div className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] text-white/35">{feature.eyebrow}</div>
                     <h3 className="text-2xl font-black leading-tight tracking-[-0.03em] text-white">{feature.title}</h3>
                     <p className="mt-4 text-sm leading-7 text-white/58">{feature.description}</p>
                     <div className="mt-8 flex items-center justify-between border-t border-white/[0.06] pt-5">
                        <span className="text-sm font-semibold text-white/85">{feature.meta}</span>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-all group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-primary">
                           <ArrowRight className="h-4 w-4" />
                        </div>
                     </div>
                  </motion.div>
               );
            })}
         </motion.div>
      </section>
   );
}
