import { NextResponse } from 'next/server';

const insights = [
  { text: "Analyzing $SOL contract: No proxy detected. Liquidity locked (98.2%)", confidence: 99, risk: "safe" },
  { text: "$PEPE variant identified: High similarity to known rug-pull signature #842", confidence: 87, risk: "danger" },
  { text: "Mempool Spike: Institutional volume detected on $ETH/USDC pairing", confidence: 92, risk: "info" },
  { text: "Neural Sync: Scanning 14.5k nodes for data-integrity...", confidence: 100, risk: "info" },
  { text: "Anomalous Transaction: Large wallet inflow from Tornado Cash detected", confidence: 95, risk: "danger" },
  { text: "Flash Loan Attack attempt: Prevented by smart-throttle protocol", confidence: 100, risk: "safe" },
  { text: "Metadata Mutation detection: $DUMP token changed owner address", confidence: 91, risk: "warning" },
  { text: "Whale Movement: 50,000 $SOL moved to cold storage", confidence: 98, risk: "info" },
  { text: "New Mint: $ALPHA contract deployed. Checking authorities...", confidence: 85, risk: "warning" },
  { text: "DEX Arbitrage: $12k profit opportunity identified on Jupiter Aggregator", confidence: 94, risk: "safe" },
];

export async function GET() {
  // Simulate a real-time decision from the "Brain"
  const randomInsight = insights[Math.floor(Math.random() * insights.length)];
  
  return NextResponse.json({
    ...randomInsight,
    id: Date.now(),
    time: new Date().toLocaleTimeString().split(" ")[0],
    timestamp: Date.now()
  });
}
