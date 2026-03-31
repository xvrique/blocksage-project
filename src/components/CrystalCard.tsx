"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

export function CrystalCard({ 
  children, 
  className, 
  id,
  glowColor = "rgba(75, 74, 254, 0.15)" 
}: { 
  children: React.ReactNode, 
  className?: string, 
  id?: string,
  glowColor?: string 
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      id={id}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative group rounded-2xl overflow-hidden ${className}`}
    >
      {/* Dynamic Glow — follows cursor */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 rounded-2xl"
        style={{
          background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 40%)`
        }}
      />

      {/* Main Content */}
      <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] p-5 md:p-7 relative z-10 h-full flex flex-col transition-all duration-300 group-hover:bg-white/[0.05] group-hover:border-white/[0.12] rounded-2xl shadow-lg">
         {children}
      </div>
    </motion.div>
  );
}
