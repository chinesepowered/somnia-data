"use client";

import { useState, useEffect } from "react";
import { Stats } from "@/types";
import { MOCK_MODE } from "@/lib/somnia-config";

const initialStats: Stats = {
  tps: 0,
  totalTransactions: 0,
  activeAddresses: 0,
  avgGasPrice: "0",
  latestBlock: 0,
};

export function useStats() {
  const [stats, setStats] = useState<Stats>(initialStats);

  useEffect(() => {
    if (MOCK_MODE) {
      // Mock mode: Generate realistic-looking stats
      const updateStats = () => {
        setStats((prev) => ({
          tps: Math.random() * 50 + 10, // 10-60 TPS
          totalTransactions: prev.totalTransactions + Math.floor(Math.random() * 5) + 1,
          activeAddresses: Math.floor(Math.random() * 1000) + 500,
          avgGasPrice: (Math.random() * 20 + 10).toFixed(2),
          latestBlock: prev.latestBlock > 0 ? prev.latestBlock + 1 : 5000000 + Math.floor(Math.random() * 10000),
        }));
      };

      // Initial stats
      updateStats();

      // Update every 3 seconds
      const interval = setInterval(updateStats, 3000);

      return () => clearInterval(interval);
    } else {
      // Real SDS implementation
      // TODO: Replace with actual Somnia Data Streams SDK

      // Example integration (pseudo-code):
      // const statsStream = sdsClient.stats.subscribe({
      //   metrics: ['tps', 'totalTransactions', 'activeAddresses', 'gasPrice', 'latestBlock'],
      //   updateInterval: 3000, // Update every 3 seconds
      // });
      //
      // statsStream.on('update', (data) => {
      //   setStats({
      //     tps: data.transactionsPerSecond,
      //     totalTransactions: data.totalTransactions,
      //     activeAddresses: data.uniqueAddresses,
      //     avgGasPrice: ethers.formatUnits(data.averageGasPrice, 'gwei'),
      //     latestBlock: data.latestBlockNumber,
      //   });
      // });
      //
      // return () => statsStream.unsubscribe();

      console.log("Real SDS mode enabled - implement SDK integration here");
    }
  }, []);

  return stats;
}
