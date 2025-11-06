"use client";

import { motion } from "framer-motion";
import { useNetwork } from "@/contexts/NetworkContext";
import { NETWORKS, NetworkType } from "@/lib/somnia-config";

export function NetworkSwitcher() {
  const { network, setNetwork } = useNetwork();

  const networks: { key: NetworkType; label: string; color: string }[] = [
    { key: 'testnet', label: 'Testnet', color: 'from-blue-500 to-cyan-500' },
    { key: 'mainnet', label: 'Mainnet', color: 'from-purple-500 to-pink-500' },
  ];

  return (
    <div className="flex items-center gap-2 bg-somnia-darker/50 backdrop-blur-sm rounded-lg p-1 border border-somnia-purple/20">
      {networks.map((net) => (
        <button
          key={net.key}
          onClick={() => setNetwork(net.key)}
          className="relative px-4 py-2 rounded-md transition-all duration-200 text-sm font-medium"
        >
          {network === net.key && (
            <motion.div
              layoutId="network-bg"
              className={`absolute inset-0 bg-gradient-to-r ${net.color} rounded-md opacity-20`}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span
            className={`relative z-10 ${
              network === net.key
                ? 'text-white'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            {net.label}
          </span>
        </button>
      ))}
    </div>
  );
}
