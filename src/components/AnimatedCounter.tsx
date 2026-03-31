"use client";
import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, animate } from "framer-motion";

export function AnimatedCounter({ 
   value, 
   duration = 2, 
   className = "" 
}: { 
   value: string | number, 
   duration?: number, 
   className?: string 
}) {
   const ref = useRef<HTMLSpanElement>(null);
   const inView = useInView(ref, { once: true, margin: "-50px" });
   
   // Handle both string numbers (142K+) and regular numbers
   const numericValue = typeof value === "string" 
      ? parseFloat(value.replace(/,/g, '')) 
      : value;
   
   if (isNaN(numericValue)) return <span className={className}>{value}</span>;

   const suffix = typeof value === "string" ? value.replace(/[0-9.,]/g, '') : "";

   const count = useMotionValue(0);
   const rounded = useTransform(count, (latest) => {
      // Format with commas if it's a large number
      return Math.round(latest).toLocaleString() + suffix;
   });

   useEffect(() => {
      if (inView) {
         animate(count, numericValue, {
            duration: duration,
            ease: [0.16, 1, 0.3, 1], // Custom slow-out ease
         });
      }
   }, [inView, numericValue, count, duration]);

   return (
      <motion.span ref={ref} className={className}>
         {rounded}
      </motion.span>
   );
}
