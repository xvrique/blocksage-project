"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface SystemEvent {
   id: number;
   type: "safe" | "danger" | "warning" | "info";
   msg: string;
   time: string;
}

interface SystemStatusContextType {
   threatLevel: number;
   systemHealth: number;
   globalLoad: number;
   oracleSync: number;
   events: SystemEvent[];
   isAuditing: boolean;
   addEvent: (type: SystemEvent["type"], msg: string) => void;
   triggerAudit: () => Promise<void>;
   clearEvents: () => void;
}

const SystemStatusContext = createContext<SystemStatusContextType | undefined>(undefined);

export function SystemStatusProvider({ children }: { children: React.ReactNode }) {
   const [threatLevel, setThreatLevel] = useState(12);
   const [systemHealth, setSystemHealth] = useState(98);
   const [globalLoad, setGlobalLoad] = useState(42.8);
   const [oracleSync, setOracleSync] = useState(12);
   const [isAuditing, setIsAuditing] = useState(false);
   const [events, setEvents] = useState<SystemEvent[]>([
      { id: 1, type: "danger", msg: "CRITICAL: Liquidity Drain on $SCAM detected", time: "14:20:01" },
      { id: 2, type: "safe", msg: "VERIFIED: $PEPE Contract Logic Cleaned", time: "14:19:45" },
      { id: 3, type: "warning", msg: "DETECTED: Dev wallet split on $MOON", time: "14:18:30" },
   ]);

   const addEvent = useCallback((type: SystemEvent["type"], msg: string) => {
      const newEvent: SystemEvent = {
         id: Date.now(),
         type,
         msg,
         time: new Date().toLocaleTimeString().split(" ")[0],
      };
      setEvents((prev) => [newEvent, ...prev.slice(0, 8)]);
   }, []);

   const triggerAudit = async () => {
      setIsAuditing(true);
      addEvent("info", "DIAGNOSTIC: Starting deep protocol audit...");
      
      // Simulate phases
      await new Promise(r => setTimeout(r, 1000));
      addEvent("info", "DIAGNOSTIC: Analyzing contract logic trees...");
      setSystemHealth(prev => Math.min(100, prev + 1));
      
      await new Promise(r => setTimeout(r, 1000));
      addEvent("info", "DIAGNOSTIC: Cross-referencing known exploit patterns...");
      setThreatLevel(prev => Math.max(5, prev - 2));
      
      await new Promise(r => setTimeout(r, 800));
      addEvent("safe", "AUDIT COMPLETE: All systems verified and stable.");
      setIsAuditing(false);
   };

   const clearEvents = () => setEvents([]);

   // Background simulation
   useEffect(() => {
      const interval = setInterval(() => {
         if (isAuditing) return;

         // Random minor fluctuations
         setGlobalLoad(prev => +(prev + (Math.random() - 0.5) * 0.5).toFixed(1));
         setOracleSync(prev => Math.max(8, Math.min(25, prev + Math.floor((Math.random() - 0.5) * 4))));

         // Occasional random events
         if (Math.random() > 0.85) {
            const types: SystemEvent["type"][] = ["safe", "warning", "info"];
            const type = types[Math.floor(Math.random() * types.length)];
            const assets = ["$SOL", "$BONK", "$JUP", "$RENDER"];
            const asset = assets[Math.floor(Math.random() * assets.length)];
            
            if (type === "warning") {
               addEvent("warning", `INTEL: Spike in transaction noise on ${asset}...`);
            } else if (type === "safe") {
               addEvent("safe", `SYNC: Oracle validation for ${asset} optimized.`);
            } else {
               addEvent("info", `NETWORK: Metadata update for ${asset} ingested.`);
            }
         }
      }, 5000);

      return () => clearInterval(interval);
   }, [isAuditing, addEvent]);

   return (
      <SystemStatusContext.Provider value={{
         threatLevel,
         systemHealth,
         globalLoad,
         oracleSync,
         events,
         isAuditing,
         addEvent,
         triggerAudit,
         clearEvents
      }}>
         {children}
      </SystemStatusContext.Provider>
   );
}

export function useSystemStatus() {
   const context = useContext(SystemStatusContext);
   if (context === undefined) {
      throw new Error("useSystemStatus must be used within a SystemStatusProvider");
   }
   return context;
}
