"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Wallet, ShieldCheck, ChevronDown, Zap, Globe, Activity } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";

interface TokenInfo {
   mint: string;
   amount: number;
   symbol?: string;
}

export function ConnectWalletHUD() {
   const { publicKey, disconnect, connected } = useWallet();
   const { setVisible } = useWalletModal();
   const { connection } = useConnection();
   const [balance, setBalance] = useState<number | null>(null);
   const [tokens, setTokens] = useState<TokenInfo[]>([]);
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const [isLoadingTokens, setIsLoadingTokens] = useState(false);
   const [rpcError, setRpcError] = useState<string | null>(null);

   // Effect for SOL balance
   useEffect(() => {
      if (publicKey && connected) {
         const fetchBalance = async () => {
             try {
                 const bal = await connection.getBalance(publicKey);
                 setBalance(bal / LAMPORTS_PER_SOL);
                 setRpcError(null);
             } catch (e: any) {
                 console.error("Failed to fetch balance", e);
                 if (e.message?.includes("403")) setRpcError("RPC_FORBIDDEN");
             }
         };
         fetchBalance();
         const id = connection.onAccountChange(publicKey, (account) => {
             setBalance(account.lamports / LAMPORTS_PER_SOL);
         });
         return () => {
             connection.removeAccountChangeListener(id);
         };
      }
   }, [publicKey, connected, connection]);

   // Effect for SPL tokens (Dual Program)
   useEffect(() => {
    if (publicKey && connected && isDropdownOpen) {
        const fetchTokens = async () => {
            setIsLoadingTokens(true);
            setRpcError(null);
            try {
                // Fetch from both programs (Standard & Token-2022)
                const [standardTokens, tokens2022] = await Promise.all([
                    connection.getParsedTokenAccountsByOwner(publicKey, { programId: TOKEN_PROGRAM_ID }),
                    connection.getParsedTokenAccountsByOwner(publicKey, { programId: TOKEN_2022_PROGRAM_ID }),
                ]);
                
                const processAccounts = (response: any) => response.value.map((accountInfo: any) => {
                    const parsedData = accountInfo.account.data.parsed.info;
                    return {
                        mint: parsedData.mint,
                        amount: parsedData.tokenAmount.uiAmount,
                        symbol: parsedData.mint.slice(0, 4).toUpperCase(),
                    };
                });

                const allTokens = [...processAccounts(standardTokens), ...processAccounts(tokens2022)];
                setTokens(allTokens.filter(t => t.amount > 0));
            } catch (e: any) {
                console.error("Failed to fetch tokens", e);
                if (e.message?.includes("403")) setRpcError("RPC_FORBIDDEN");
                else setRpcError("FETCH_FAILED");
            } finally {
                setIsLoadingTokens(false);
            }
        };
        fetchTokens();
    }
   }, [publicKey, connected, isDropdownOpen, connection]);

   const shortenedAddress = publicKey ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}` : "";

   const copyAddress = () => {
       if (publicKey) {
           navigator.clipboard.writeText(publicKey.toBase58());
       }
   };

   return (
      <div className="relative transition-all duration-500">
         <AnimatePresence mode="wait">
            {!connected ? (
               <motion.button
                  key="disconnected"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => setVisible(true)}
                  className="group relative flex items-center gap-2 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all hover:border-primary/50 hover:bg-white/[0.06] md:px-5 md:text-[11px]"
               >
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <motion.div
                     animate={{ rotate: [0, 8, -8, 0] }}
                     transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                     className="relative z-10"
                  >
                     <Wallet className="h-4 w-4 text-primary" />
                  </motion.div>
                  <span className="relative z-10">Connect Wallet</span>
               </motion.button>
            ) : (
               <div className="relative">
                <motion.div
                    key="connected"
                    initial={{ opacity: 0, x: 20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.9 }}
                    className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-black/40 p-1 pr-4 backdrop-blur-2xl transition-all hover:border-primary/40 md:pr-5"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    {/* Mini Avatar / Identity Ring */}
                    <div className="relative h-10 w-10 md:h-12 md:w-12 rounded-full border-2 border-primary/40 p-0.5 bg-black/40 group-hover:rotate-12 transition-transform duration-500">
                        <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-transparent">
                            <Image src="/assets/head.png" alt="Profile" fill className="object-contain" />
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-safe rounded-full border-2 border-[#090B14] shadow-[0_0_10px_rgba(0,208,132,0.5)] animate-pulse" />
                    </div>

                    <div className="flex flex-col items-start gap-0.5 pr-1 text-left">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] md:text-xs font-black text-white font-mono tracking-tighter uppercase">{shortenedAddress}</span>
                            <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }}>
                                <ChevronDown className="w-3 h-3 text-gray-500 group-hover:text-primary transition-colors" />
                            </motion.div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-primary/20 rounded-full border border-primary/20">
                                <Zap className="w-2 h-2 text-primary fill-primary" />
                                <span className="text-[8px] font-black text-white tracking-widest uppercase">
                                    {balance !== null ? `${balance.toFixed(2)} SOL` : "SYNCING..."}
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Dropdown Menu */}
                <AnimatePresence>
                    {isDropdownOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020]/80 p-1 shadow-2xl backdrop-blur-3xl"
                        >
                            <div className="flex flex-col gap-1">
                                <button 
                                    onClick={copyAddress}
                                    className="flex items-center justify-between rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-widest text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                                >
                                    <span>Copy Address</span>
                                    <Globe className="h-3 w-3" />
                                </button>
                                
                                <div className="mx-2 h-[1px] bg-white/5" />
                                
                                <div className="px-4 py-2 pt-3">
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">Portfolio tokens</span>
                                </div>

                                <div className="max-h-48 overflow-y-auto px-1 custom-scrollbar">
                                    {isLoadingTokens ? (
                                        <div className="flex items-center justify-center py-6">
                                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                                                <Activity className="h-5 w-5 text-primary/40" />
                                            </motion.div>
                                        </div>
                                    ) : rpcError === "RPC_FORBIDDEN" ? (
                                        <div className="py-4 px-4 text-center">
                                            <span className="text-[9px] font-black text-red-400 uppercase tracking-widest leading-relaxed">
                                                RPC Access Blocked 403. Please use your private QuickNode URL in .env.local
                                            </span>
                                        </div>
                                    ) : tokens.length > 0 ? (
                                        tokens.map((token, idx) => (
                                            <div key={idx} className="flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-white/[0.03]">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/10">
                                                        <span className="text-[10px] font-bold text-primary">{token.symbol?.[0]}</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] font-black text-white">{token.symbol}</span>
                                                        <span className="text-[8px] font-bold text-white/40 uppercase tracking-tighter">Verified Asset</span>
                                                    </div>
                                                </div>
                                                <span className="text-[10px] font-black text-white">{token.amount.toFixed(2)}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-4 text-center">
                                            <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">No SPL tokens found</span>
                                        </div>
                                    )}
                                </div>

                                <div className="mx-2 mt-2 h-[1px] bg-white/5" />

                                <button
                                    onClick={() => disconnect()}
                                    className="mb-1 mt-1 flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 py-3 text-[10px] font-black uppercase tracking-widest text-red-400 transition-all hover:bg-red-500/10"
                                >
                                    <Zap className="h-3 w-3 rotate-180" />
                                    Disconnect Wallet
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
               </div>
            )}
         </AnimatePresence>
      </div>
   );
}
