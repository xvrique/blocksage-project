"use client";

import { useState } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { getMint, TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
import { Buffer } from "buffer";

export type RiskLevel = "SAFE" | "WATCH" | "DANGER" | "INVALID" | "UNKNOWN";

export interface ScanResult {
    address: string;
    name: string;
    symbol: string;
    logoURI?: string;
    riskLevel: RiskLevel;
    details: {
        mintAuthority: string | null;
        freezeAuthority: string | null;
        isMutable: boolean;
        owner: string;
        programId: string;
    };
}

export function useSolanaScanner() {
    const { connection } = useConnection();
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState<ScanResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [scanPhase, setScanPhase] = useState<string>("IDLE");

    const scan = async (address: string) => {
        if (!address) return;
        
        setIsScanning(true);
        setError(null);
        setResult(null);
        
        try {
            // Aggressive cleaning: trim + remove accidental quotes
            const cleanAddress = address.trim().replace(/^["']|["']$/g, '');
            console.log("[DEBUG SCAN] Launching Analysis:", cleanAddress);
            
            setScanPhase("VALIDATING");
            let pubKey: PublicKey;
            try {
                pubKey = new PublicKey(cleanAddress);
            } catch (pkErr) {
                console.error("[DEBUG] Invalid public key format:", cleanAddress);
                throw new Error("INVALID_FORMAT");
            }
            
            setScanPhase("FETCHING ON-CHAIN");
            
            // 1. Fetch Mint info
            let mintInfo;
            let programId = TOKEN_PROGRAM_ID;

            try {
                mintInfo = await getMint(connection, pubKey, undefined, TOKEN_PROGRAM_ID);
                programId = TOKEN_PROGRAM_ID;
            } catch (e: any) {
                try {
                    mintInfo = await getMint(connection, pubKey, undefined, TOKEN_2022_PROGRAM_ID);
                    programId = TOKEN_2022_PROGRAM_ID;
                } catch (e2: any) {
                    // This is likely a wallet address (System Account)
                    console.warn("[DEBUG] Non-token account detected:", cleanAddress);
                    
                    setScanPhase("IDLE");
                    setResult({
                        address,
                        name: "System Account",
                        symbol: "WALLET",
                        logoURI: undefined,
                        riskLevel: "INVALID",
                        details: {
                            mintAuthority: null,
                            freezeAuthority: null,
                            isMutable: false,
                            owner: pubKey.toBase58(),
                            programId: "11111111111111111111111111111111" // System Program
                        }
                    });
                    setIsScanning(false);
                    return;
                }
            }
            
            setScanPhase("DECODING METADATA");
            // 2. Fetch Identity (Multi-Source fallback)
            let isMutable = true;
            let name = "Protected Asset";
            let symbol = "BLKS";
            let logoURI = undefined;

            try {
                // Tier 1: DexScreener (Best for memes/PumpFun)
                const dsResponse = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${cleanAddress}`);
                if (dsResponse.ok) {
                    const dsData = await dsResponse.json();
                    if (dsData.pairs && dsData.pairs.length > 0) {
                        const tokenInfo = dsData.pairs[0].baseToken;
                        name = tokenInfo.name || name;
                        symbol = tokenInfo.symbol || symbol;
                        logoURI = dsData.pairs[0].info?.imageUrl;
                    }
                }
            } catch (dsErr) {
                console.warn("[DEBUG] DexScreener API offline");
            }

            // Tier 2: Jupiter Fallback
            if (!logoURI) {
                try {
                    const jupResponse = await fetch(`https://datapi.jup.ag/v1/assets/search?query=${cleanAddress}`);
                    if (jupResponse.ok) {
                        const jupData = await jupResponse.json();
                        if (jupData.data && jupData.data.length > 0) {
                            const mainAsset = jupData.data[0];
                            name = mainAsset.name || name;
                            symbol = mainAsset.symbol || symbol;
                            logoURI = mainAsset.imageUrl || mainAsset.logoURI;
                        }
                    }
                } catch (jupErr) {
                    console.warn("[DEBUG] Jupiter API offline");
                }
            }

            // Tier 3: Metaplex (Binary Only)
            try {
                const METADATA_HEX = [143, 23, 76, 172, 170, 168, 62, 114, 219, 137, 237, 214, 234, 185, 23, 107, 180, 246, 212, 196, 68, 110, 128, 222, 155, 34, 45, 173, 107, 168, 142, 12];
                const METADATA_PROGRAM_ID = new PublicKey(new Uint8Array(METADATA_HEX));
                const [metadataPDA] = PublicKey.findProgramAddressSync([Buffer.from("metadata"), METADATA_PROGRAM_ID.toBuffer(), pubKey.toBuffer()], METADATA_PROGRAM_ID);
                const metadataAccount = await connection.getAccountInfo(metadataPDA);
                if (metadataAccount && metadataAccount.data.length > 0) {
                    isMutable = metadataAccount.data[0] !== 0; 
                }
            } catch (mErr) {
                console.warn("[DEBUG] Metadata check bypassed");
            }

            setScanPhase("SCREENING RISK");
            // 3. Evaluate Risk
            const hasMintAuth = mintInfo.mintAuthority !== null;
            const hasFreezeAuth = mintInfo.freezeAuthority !== null;

            let risk: RiskLevel = "SAFE";
            if (hasMintAuth || hasFreezeAuth) {
                risk = "DANGER";
            } else if (isMutable) {
                risk = "WATCH";
            }

            setResult({
                address,
                name,
                symbol,
                logoURI,
                riskLevel: risk,
                details: {
                    mintAuthority: mintInfo.mintAuthority?.toBase58() || null,
                    freezeAuthority: mintInfo.freezeAuthority?.toBase58() || null,
                    isMutable,
                    owner: pubKey.toBase58(),
                    programId: programId.toBase58()
                }
            });

        } catch (e: any) {
            console.error("[DEBUG] Scan process error:", e.message);
            if (e.message === "INVALID_FORMAT") {
                setError("Invalid address format detected. BlockSage currently only supports the Solana Network.");
            } else {
                setError("Scanner Link Failure. Please ensure you are connected to a valid network.");
            }
        } finally {
            setIsScanning(false);
            setScanPhase("IDLE");
        }
    };

    return { scan, isScanning, result, error, scanPhase };
}
