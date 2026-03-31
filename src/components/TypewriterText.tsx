"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function TypewriterText({
   text,
   className = "",
   delay = 0
}: {
   text: string,
   className?: string,
   delay?: number
}) {
   const ref = useRef<HTMLHeadingElement>(null);
   const isInView = useInView(ref, { once: true });

   // Split by individual words to prevent layout breaks!
   const words = text.split(" ");

   const container = {
      hidden: { opacity: 0 },
      visible: (i = 1) => ({
         opacity: 1,
         transition: { staggerChildren: 0.12, delayChildren: delay }
      })
   } as const;

   const child = {
      hidden: {
         opacity: 0,
         y: 20,
         filter: "blur(8px)" // Premium "reveal" effect
      },
      visible: {
         opacity: 1,
         y: 0,
         filter: "blur(0px)",
         transition: {
            duration: 0.8,
            ease: [0.2, 0.65, 0.3, 0.9] // Elegant, cinematic reveal
         }
      }
   } as const;

   return (
      <motion.h1
         ref={ref}
         variants={container}
         initial="hidden"
         animate={isInView ? "visible" : "hidden"}
         className={`${className} flex flex-wrap justify-center lg:justify-start gap-x-[0.25em]`}
      >
         {words.map((word, index) => (
            <motion.span
               key={index}
               variants={child}
               className="inline-block whitespace-nowrap"
            >
               {word}
            </motion.span>
         ))}
      </motion.h1>
   );
}
