"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Stats } from "@/types";
import { blockchainProvider } from "@/lib/blockchain-provider";
import { useNetwork } from "@/contexts/NetworkContext";

const initialStats: Stats = {
  tps: 0,
  totalTransactions: 0,
  activeAddresses: 0,
  avgGasPrice: "0",
  latestBlock: 0,
};

export function useStats() {
  const [stats, setStats] = useState<Stats>(initialStats);
  const { network } = useNetwork();
  const [blockTimes, setBlockTimes] = useState<number[]>([]);

  useEffect(() => {
    const provider = blockchainProvider.getProvider(network);
    let isSubscribed = true;
    let totalTxCount = 0;
    const uniqueAddresses = new Set<string>();

    const updateStats = async (blockNumber: number) => {
      try {
        console.log('📊 New block detected:', blockNumber);
        const [block, feeData] = await Promise.all([
          provider.getBlock(blockNumber, true),
          provider.getFeeData(),
        ]);

        if (!block || !isSubscribed) return;

        // Track block timestamps for TPS calculation
        const now = Date.now();
        setBlockTimes((prev) => {
          const updated = [...prev, now];
          // Keep only last 10 block times
          return updated.slice(-10);
        });

        // Count transactions in this block
        const txCount = block.transactions?.length || 0;
        totalTxCount += txCount;

        // Track unique addresses (from prefetched transactions)
        if (block.prefetchedTransactions) {
          for (const tx of block.prefetchedTransactions.slice(0, 20)) {
            uniqueAddresses.add(tx.from);
            if (tx.to) uniqueAddresses.add(tx.to);
          }
        }

        // Calculate TPS based on recent block times
        let tps = 0;
        setBlockTimes((times) => {
          if (times.length >= 2) {
            const timeDiff = (times[times.length - 1] - times[0]) / 1000; // seconds
            if (timeDiff > 0) {
              tps = totalTxCount / timeDiff;
            }
          }
          return times;
        });

        if (isSubscribed) {
          setStats({
            tps,
            totalTransactions: totalTxCount,
            activeAddresses: uniqueAddresses.size,
            avgGasPrice: feeData.gasPrice
              ? ethers.formatUnits(feeData.gasPrice, 'gwei')
              : "0",
            latestBlock: block.number,
          });
        }
      } catch (error) {
        console.error('Error updating stats:', error);
      }
    };

    // Subscribe to new blocks
    console.log('📡 Subscribing to block events for stats...');
    provider.on('block', updateStats);

    // Load initial stats
    const loadInitialStats = async () => {
      try {
        const latestBlockNumber = await provider.getBlockNumber();
        await updateStats(latestBlockNumber);
      } catch (error) {
        console.error('Error loading initial stats:', error);
      }
    };

    loadInitialStats();

    // Cleanup
    return () => {
      isSubscribed = false;
      provider.off('block', updateStats);
    };
  }, [network]);

  return stats;
}
