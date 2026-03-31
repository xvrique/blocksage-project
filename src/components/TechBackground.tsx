"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function TechBackground() {
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
   }, []);

   if (!mounted) return null; // Prevent hydration mismatch

   return (
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none opacity-20">
         <svg width="100%" height="100%" className="absolute inset-0">
            {/* Horizontal Gentle Moving Lines */}
            {[...Array(6)].map((_, i) => (
               <motion.line
                  key={`h-${i}`}
                  x1="0"
                  y1={15 + i * 15 + "%"}
                  x2="100%"
                  y2={15 + i * 15 + "%"}
                  stroke="rgba(108, 99, 255, 0.15)"
                  strokeWidth="0.5"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                     duration: 20 + i * 5,
                     repeat: Infinity,
                     ease: "linear",
                     delay: i * -2,
                  }}
               />
            ))}

            {/* Vertical Gentle Moving Lines */}
            {[...Array(8)].map((_, i) => (
               <motion.line
                  key={`v-${i}`}
                  x1={10 + i * 12 + "%"}
                  y1="0"
                  x2={10 + i * 12 + "%"}
                  y2="100%"
                  stroke="rgba(0, 229, 255, 0.1)"
                  strokeWidth="0.5"
                  initial={{ y: "-100%" }}
                  animate={{ y: "100%" }}
                  transition={{
                     duration: 25 + i * 4,
                     repeat: Infinity,
                     ease: "linear",
                     delay: i * -3,
                  }}
               />
            ))}

            {/* Subtle Drifting Nodes (SVG Circles) */}
            {[...Array(12)].map((_, i) => (
               <motion.circle
                  key={`p-${i}`}
                  r={1.5 + (i % 3)}
                  fill={i % 2 === 0 ? "rgba(108, 99, 255, 0.2)" : "rgba(0, 229, 255, 0.15)"}
                  initial={{ 
                     x: (10 + (i * 7.5)) + "%", // Deterministic initial position
                     y: (10 + (i * 7.5)) + "%",
                     opacity: 0.1
                  }}
                  animate={{ 
                     x: [null, (20 + (i * 6.5)) + "%", (10 + (i * 7.5)) + "%"],
                     y: [null, (80 - (i * 6.5)) + "%", (10 + (i * 7.5)) + "%"],
                     opacity: [0.1, 0.3, 0.1]
                  }}
                  transition={{
                     duration: 40 + i * 10,
                     repeat: Infinity,
                     ease: "easeInOut",
                  }}
               />
            ))}
         </svg>
      </div>
   );
}
