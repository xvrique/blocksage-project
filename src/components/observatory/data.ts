import { Shield, Orbit, Eye, ShieldCheck, TrendingUp } from "lucide-react";

export const features = [
   {
      icon: Shield,
      eyebrow: "Risk clarity",
      title: "See danger before it feels expensive",
      description:
         "Human-friendly contract scanning that flags honeypots, malicious permissions, and suspicious execution paths without turning the interface into a wall of jargon.",
      meta: "98.2% signal accuracy",
   },
   {
      icon: Orbit,
      eyebrow: "Live network",
      title: "Track movement across the chain in real time",
      description:
         "Stream wallet motion, fresh deployments, and network anomalies through a calmer visual system that feels alive and easier to understand at a glance.",
      meta: "1ms median reaction",
   },
   {
      icon: Eye,
      eyebrow: "Always watching",
      title: "Monitoring that stays helpful, not noisy",
      description:
         "Get priority alerts, cleaner status grouping, and a readable action trail so every warning feels useful instead of performative.",
      meta: "24/7 autonomous guard",
   },
];

export const stats = [
   { value: "142,000+", label: "Contracts screened" },
   { value: "1,240", label: "Active sentinels" },
   { value: "14", label: "Chains live" },
   { value: "99.9%", label: "System uptime" },
];

export const quickSignals = [
   { icon: ShieldCheck, label: "Verified protocol", value: "Encrypted" },
   { icon: TrendingUp, label: "Throughput", value: "4.2 GB/s" },
];
