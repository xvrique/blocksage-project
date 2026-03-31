"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { Sparkles } from "lucide-react";

// --- Animation Variants ---
export const container = {
   hidden: { opacity: 0 },
   show: {
      opacity: 1,
      transition: {
         staggerChildren: 0.08,
         delayChildren: 0.08,
      },
   },
} as const;

export const item = {
   hidden: { opacity: 0, y: 18 },
   show: {
      opacity: 1,
      y: 0,
      transition: {
         duration: 0.65,
         ease: [0.22, 1, 0.36, 1],
      },
   },
} as const;

export const softReveal = {
   hidden: { opacity: 0, scale: 0.98, y: 24 },
   show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
         duration: 0.8,
         ease: [0.22, 1, 0.36, 1],
      },
   },
} as const;

// --- Sub-components ---

export function SectionTag({ label }: { label: string }) {
   return (
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-xl">
         <Sparkles className="h-3.5 w-3.5 text-primary" />
         <span className="text-[10px] font-black uppercase tracking-[0.24em] text-white/70">{label}</span>
      </div>
   );
}

export function SignalPill({
   icon: Icon,
   label,
   value,
   className,
   delay = 0,
}: {
   icon: any;
   label: string;
   value: string;
   className: string;
   delay?: number;
}) {
   return (
      <motion.div
         variants={item}
         className={`absolute z-20 ${className}`}
         animate={{ y: [0, -5, 0] }}
         transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
      >
         <div className="group flex items-center gap-3.5 rounded-[20px] border border-white/10 bg-white/[0.04] p-3 backdrop-blur-3xl transition-all duration-500 hover:scale-105 hover:border-primary/30 hover:bg-white/[0.06]">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-500 group-hover:bg-primary/20">
               <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0 pr-2">
               <div className="truncate text-[9.5px] font-bold uppercase tracking-[0.24em] text-white/35">{label}</div>
               <div className="mt-0.5 truncate text-[14px] font-black tracking-tight text-white/90">{value}</div>
            </div>
         </div>
      </motion.div>
   );
}

export function MagneticButton({
   children,
   variant = "primary",
   onClick,
}: {
   children: React.ReactNode;
   variant?: "primary" | "secondary";
   onClick?: () => void;
}) {
   const ref = useRef<HTMLButtonElement | null>(null);
   const x = useMotionValue(0);
   const y = useMotionValue(0);
   const springX = useSpring(x, { stiffness: 180, damping: 14, mass: 0.2 });
   const springY = useSpring(y, { stiffness: 180, damping: 14, mass: 0.2 });

   const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const offsetX = e.clientX - (rect.left + rect.width / 2);
      const offsetY = e.clientY - (rect.top + rect.height / 2);
      x.set(offsetX * 0.18);
      y.set(offsetY * 0.18);
   };

   const reset = () => {
      x.set(0);
      y.set(0);
   };

   const base =
      "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.22em] transition-all duration-300";
   const styles =
      variant === "primary"
         ? "bg-white text-black shadow-[0_16px_40px_rgba(255,255,255,0.14)] hover:shadow-[0_20px_60px_rgba(255,255,255,0.18)]"
         : "border border-white/12 bg-white/[0.04] text-white hover:border-white/20 hover:bg-white/[0.07]";

   return (
      <motion.button
         ref={ref}
         style={{ x: springX, y: springY }}
         onMouseMove={handleMove}
         onMouseLeave={reset}
         whileTap={{ scale: 0.98 }}
         className={`${base} ${styles}`}
         onClick={onClick}
      >
         <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
         {children}
      </motion.button>
   );
}

export function AmbientOrb() {
   return (
      <>
         <div className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-primary/12 blur-[120px]" />
         <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-[140px]" />
         <div className="pointer-events-none absolute left-1/2 top-1/3 h-48 w-48 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[120px]" />
      </>
   );
}

export function FloatingGrid() {
   return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[36px]">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:44px_44px] opacity-30" />
         <motion.div
            className="absolute inset-y-0 -left-1/4 w-1/3 bg-[radial-gradient(circle,rgba(108,99,255,0.18),transparent_65%)] blur-3xl"
            animate={{ x: ["0%", "160%", "0%"] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
         />
      </div>
   );
}
