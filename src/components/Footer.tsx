"use client";
import { Send, MessageSquare, Terminal, Mail, ExternalLink, Box } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
   return (
      <footer className="relative mt-16 pt-16 pb-28 border-t border-white/[0.06] overflow-hidden">
         {/* Background Decor */}
         <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-primary/[0.04] blur-[100px] rounded-full pointer-events-none" />
         
         <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
               
               {/* Column 1: Brand */}
               <div className="space-y-5">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 relative">
                        <Image src="/assets/icon.png" alt="Logo" fill className="object-contain" />
                     </div>
                     <span className="font-outfit font-black tracking-[0.3em] text-lg text-white uppercase italic">BlockSage</span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-[260px]">
                     The world's first interactive crypto-risk observatory. Mapping the chain, one block at a time.
                  </p>
                  <div className="flex items-center gap-3 pt-1">
                     {[
                        { icon: Send, href: "#" },
                        { icon: MessageSquare, href: "#" },
                        { icon: Terminal, href: "/#pulse-feed" },
                     ].map((social, i) => (
                        <Link 
                           key={i} 
                           href={social.href} 
                           className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white hover:border-primary/40 transition-all"
                        >
                           <social.icon className="w-3.5 h-3.5" />
                        </Link>
                     ))}
                  </div>
               </div>

               <div className="space-y-5">
                  <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">Protocol</h4>
                  <ul className="space-y-3">
                     {[
                        { name: 'Intelligence Brain', href: '#' },
                        { name: 'Sage Academy', href: '/learn' },
                        { name: 'Audit Terminal', href: '/#pulse-feed' },
                        { name: 'Hall of Integrity', href: '#' }
                     ].map((link, i) => (
                        <li key={i}>
                           <Link href={link.href} className="text-xs font-medium text-gray-500 hover:text-white transition-colors flex items-center gap-2.5 group">
                              <Box className="w-3 h-3 opacity-30 group-hover:text-primary group-hover:opacity-100 transition-all" /> {link.name}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Column 3: Resources */}
               <div className="space-y-5">
                  <h4 className="text-[10px] font-bold text-accent-cyan uppercase tracking-[0.4em]">Resources</h4>
                  <ul className="space-y-3">
                     {['Documentation', 'API Access', 'Risk Methodology', 'Whitepaper'].map((link, i) => (
                        <li key={i}>
                           <Link href="#" className="text-xs font-medium text-gray-500 hover:text-white transition-colors flex items-center gap-2.5 group">
                              <ExternalLink className="w-3 h-3 opacity-30 group-hover:text-accent-cyan group-hover:opacity-100 transition-all" /> {link}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Column 4: Contact */}
               <div className="space-y-5">
                  <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.4em]">Contact</h4>
                  <div className="bg-white/[0.03] border border-white/[0.06] p-5 rounded-2xl space-y-4 group hover:border-white/[0.12] transition-all">
                     <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/20">
                           <Mail className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                           <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Support</div>
                           <div className="text-xs font-medium text-white group-hover:text-primary transition-colors">contact@blocksage.net</div>
                        </div>
                     </div>
                     <button className="w-full py-3 bg-white/[0.04] hover:bg-white/[0.08] text-[10px] font-bold text-white uppercase tracking-wider rounded-xl border border-white/[0.06] transition-all active:scale-[0.98]"> 
                        Open Ticket 
                     </button>
                  </div>
               </div>

            </div>

            {/* Bottom Copyright */}
            <div className="mt-16 pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] text-gray-600">
               <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-safe rounded-full animate-pulse" />
                  <span className="font-medium uppercase tracking-widest">© 2026 BlockSage Protocol Labs</span>
               </div>
               <div className="flex items-center gap-6">
                  <Link href="#" className="font-medium uppercase tracking-widest hover:text-white transition-colors">Privacy</Link>
                  <Link href="#" className="font-medium uppercase tracking-widest hover:text-white transition-colors">Terms</Link>
               </div>
            </div>
         </div>
      </footer>
   );
}
