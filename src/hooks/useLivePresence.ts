"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useLivePresence() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const channel = supabase.channel("live-analysts", {
            config: {
                presence: {
                    key: "user",
                },
            },
        });

        channel
            .on("presence", { event: "sync" }, () => {
                const presenceState = channel.presenceState();
                const totalPresenceCount = Object.keys(presenceState).length;
                setCount(totalPresenceCount);
            })
            .on("presence", { event: "join" }, ({ newPresences }) => {
                console.log("New analysts joined:", newPresences);
            })
            .on("presence", { event: "leave" }, ({ leftPresences }) => {
                console.log("Analysts left:", leftPresences);
            })
            .subscribe(async (status) => {
                if (status === "SUBSCRIBED") {
                    await channel.track({ online_at: new Date().toISOString() });
                }
            });

        return () => {
            channel.unsubscribe();
        };
    }, []);

    return count;
}
