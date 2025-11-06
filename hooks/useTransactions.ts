"use client";

import { useState, useEffect } from "react";
import { Transaction } from "@/types";
import { MOCK_MODE } from "@/lib/somnia-config";

// Mock transaction generator for demo
function generateMockTransaction(): Transaction {
  const types: Transaction['type'][] = ['transfer', 'contract', 'nft'];
  const randomType = types[Math.floor(Math.random() * types.length)];

  return {
    hash: '0x' + Math.random().toString(16).slice(2, 66),
    from: '0x' + Math.random().toString(16).slice(2, 42),
    to: Math.random() > 0.1 ? '0x' + Math.random().toString(16).slice(2, 42) : null,
    value: (Math.random() * 10).toFixed(6),
    timestamp: Math.floor(Date.now() / 1000),
    blockNumber: Math.floor(Math.random() * 1000000) + 5000000,
    gasUsed: (Math.random() * 100000).toFixed(0),
    type: randomType,
  };
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (MOCK_MODE) {
      // Mock mode: Generate random transactions
      const interval = setInterval(() => {
        const newTx = generateMockTransaction();
        setTransactions((prev) => [newTx, ...prev].slice(0, 50));
      }, 2000 + Math.random() * 3000); // Random interval 2-5 seconds

      // Generate initial transactions
      const initialTxs = Array.from({ length: 5 }, () => generateMockTransaction());
      setTransactions(initialTxs);

      return () => clearInterval(interval);
    } else {
      // Real SDS implementation
      // TODO: Replace with actual Somnia Data Streams SDK

      // Example integration (pseudo-code):
      // const stream = sdsClient.transactions.subscribe({
      //   network: 'testnet',
      //   filters: {
      //     includeContracts: true,
      //     includeTransfers: true,
      //   }
      // });
      //
      // stream.on('transaction', (tx) => {
      //   const formattedTx: Transaction = {
      //     hash: tx.hash,
      //     from: tx.from,
      //     to: tx.to,
      //     value: ethers.formatEther(tx.value),
      //     timestamp: tx.timestamp,
      //     blockNumber: tx.blockNumber,
      //     gasUsed: tx.gasUsed.toString(),
      //     type: determineType(tx),
      //   };
      //   setTransactions((prev) => [formattedTx, ...prev].slice(0, 50));
      // });
      //
      // return () => stream.unsubscribe();

      console.log("Real SDS mode enabled - implement SDK integration here");
    }
  }, []);

  return transactions;
}
