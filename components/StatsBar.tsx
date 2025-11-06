"use client";

import { motion } from "framer-motion";
import { useStats } from "@/hooks/useStats";

export function StatsBar() {
  const stats = useStats();

  const statItems = [
    { label: "TPS", value: stats.tps.toFixed(2), icon: "⚡" },
    { label: "Total Transactions", value: stats.totalTransactions.toLocaleString(), icon: "📊" },
    { label: "Active Addresses", value: stats.activeAddresses.toLocaleString(), icon: "👥" },
    { label: "Latest Block", value: `#${stats.latestBlock}`, icon: "🔷" },
  ];

  return (
    <div className="border-b border-somnia-purple/20 bg-somnia-darker/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statItems.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-somnia-purple/10 to-somnia-blue/10 rounded-lg p-4 border border-somnia-purple/20"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{stat.icon}</span>
                <span className="text-sm text-gray-400">{stat.label}</span>
              </div>
              <motion.div
                key={stat.value}
                initial={{ scale: 1.2, color: "#7B3FF2" }}
                animate={{ scale: 1, color: "#FFFFFF" }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-bold"
              >
                {stat.value}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
