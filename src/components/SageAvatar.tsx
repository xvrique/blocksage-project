"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const messages = [
  "Hey there! I'm Sage. Be careful with low liquidity tokens!",
  "Did you know? Renounced contracts reduce rug-pull risks.",
  "Check out the leaderboard to see top risk analysts this week🏆",
  "Hold time is a great metric. Watch out for tokens insiders flip fast.",
];

export function SageAvatar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);

  const [isVisible, setIsVisible] = useState(true);

  // Hide when hero is in view to prevent mascot overlap
  useEffect(() => {
    const heroElement = document.getElementById('hero-section');
    if (!heroElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(heroElement);
    return () => observer.disconnect();
  }, []);

  // Auto-cycle messages every 15s if open
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <div 
       className={`fixed bottom-10 right-10 z-50 hidden md:flex flex-col items-end gap-4 transition-all duration-700 ${
         isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'
       }`}
    >

      {/* Pop-up Message */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 20, scale: 0.9, filter: 'blur(10px)', transition: { duration: 0.2 } }}
            className="bg-white/10 backdrop-blur-2xl border border-white/20 p-5 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-80 relative isolate overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/20 blur-3xl pointer-events-none" />

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col gap-3 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-pink to-primary flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-bold text-white text-sm">Sage's Wisdom</h4>
              </div>

              <p className="text-sm text-gray-200 leading-relaxed font-medium">
                "{messages[currentMessage]}"
              </p>

              <div className="flex justify-between items-center mt-2">
                <div className="flex gap-1">
                  {messages.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all ${i === currentMessage ? 'w-4 bg-primary' : 'w-1 bg-white/20'}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setCurrentMessage((prev) => (prev + 1) % messages.length)}
                  className="text-xs font-bold text-accent-cyan hover:text-white transition-colors flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-full border border-white/10"
                >
                  Next Tip <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Avatar Trigger */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group focus:outline-none"
      >
        {/* Outer Glow */}
        <div className="absolute inset-0 bg-primary/40 rounded-full blur-2xl group-hover:bg-primary/60 transition-all duration-500 scale-110" />

        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#1A1C2E] to-[#0D0F1A] border-2 border-white/10 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden z-10">
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [0, 2, 0, -2, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut"
            }}
            className="w-[120%] h-[120%] relative"
          >
            <Image
              src="/assets/head.png"
              alt="Sage Mascot"
              fill
              className="object-contain transform translate-y-2"
            />
          </motion.div>

          {/* Glass Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
        </div>

        {/* Notification Badge */}
        {!isOpen && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-accent-pink border-4 border-background flex items-center justify-center z-20 shadow-[0_0_15px_rgba(255,86,164,0.5)]"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          </motion.span>
        )}
      </motion.button>
    </div>
  );
}
