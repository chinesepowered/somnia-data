"use client";

import { useNetwork } from "@/contexts/NetworkContext";
import { NETWORKS } from "@/lib/somnia-config";

export function NetworkBadge() {
  const { network } = useNetwork();
  const config = NETWORKS[network];

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 px-4 py-2 bg-somnia-purple/20 rounded-full border border-somnia-purple/50">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-sm font-medium">LIVE</span>
      </div>
      <div className="px-4 py-2 bg-somnia-blue/20 rounded-full border border-somnia-blue/50">
        <span className="text-sm font-medium">{config.name}</span>
      </div>
    </div>
  );
}
