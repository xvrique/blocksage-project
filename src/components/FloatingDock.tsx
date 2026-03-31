"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { LayoutDashboard, Compass, Trophy, Brain, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import clsx from "clsx";

const navItems = [
  { name: "Observatory", href: "/", icon: LayoutDashboard },
  { name: "Academy", href: "/learn", icon: Compass },
  { name: "Hall of Fame", href: "/leaderboard", icon: Trophy },
  { name: "Brain", href: "/brain", icon: Brain },
];

function NavIcon({ item, mouseX }: { item: typeof navItems[0], mouseX: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isActive = pathname === item.href;

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 60, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <Link href={item.href}>
      <motion.div
        ref={ref}
        style={{ width: typeof window !== 'undefined' && window.innerWidth < 768 ? 42 : width }}
        className={clsx(
          "aspect-square rounded-full flex items-center justify-center relative transition-colors border",
          isActive 
            ? "bg-primary/20 border-primary/40 text-white shadow-[0_0_20px_rgba(75,74,254,0.3)]" 
            : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
        )}
      >
        <item.icon className="w-4 h-4 md:w-5 md:h-5" />
        {isActive && (
          <motion.div
            layoutId="dock-indicator"
            className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
          />
        )}
      </motion.div>
    </Link>
  );
}

export function FloatingDock() {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-fit">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-center gap-2 md:gap-4 bg-[#0A0F1E]/80 backdrop-blur-2xl px-3 py-2 md:px-5 md:py-3 rounded-full border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer overflow-hidden"
      >
        <div className="flex items-center gap-2 md:gap-4">
          {navItems.map((item) => (
            <NavIcon key={item.name} item={item} mouseX={mouseX} />
          ))}
        </div>
        
        <div className="w-[1px] h-6 md:h-8 bg-white/10 mx-1 md:mx-2" />
        
        {/* $BLS Balance Quick View */}
        <div className="flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-4 md:py-2 bg-primary/10 rounded-full border border-primary/20 whitespace-nowrap">
           <Zap className="w-3 h-3 md:w-4 md:h-4 text-accent-cyan fill-accent-cyan animate-pulse" />
           <span className="text-[10px] md:text-xs font-bold text-white tracking-widest uppercase truncate max-w-[60px] md:max-w-none">1,240 <span className="opacity-50 hidden sm:inline">$BLS</span></span>
        </div>
      </motion.div>
    </div>
  );
}
