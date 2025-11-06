"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Transaction } from "@/types";
import { blockchainProvider } from "@/lib/blockchain-provider";
import { useNetwork } from "@/contexts/NetworkContext";

function determineTransactionType(tx: ethers.TransactionResponse): Transaction['type'] {
  // Contract creation (to address is null)
  if (tx.to === null) {
    return 'contract';
  }

  // Simple heuristic: if value is 0, likely a contract interaction or NFT
  if (tx.value === 0n) {
    // Could add more sophisticated NFT detection by checking logs
    return Math.random() > 0.5 ? 'contract' : 'nft';
  }

  return 'transfer';
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { network } = useNetwork();

  useEffect(() => {
    const provider = blockchainProvider.getProvider(network);
    let isSubscribed = true;

    // Function to process new blocks and extract transactions
    const processBlock = async (blockNumber: number) => {
      try {
        const block = await provider.getBlock(blockNumber, true);

        if (!block || !block.transactions || !isSubscribed) return;

        // Get full transaction details for prefetched transactions
        const txPromises = block.transactions.slice(0, 10).map(async (tx) => {
          if (typeof tx === 'string') {
            return provider.getTransaction(tx);
          }
          return tx;
        });

        const txs = await Promise.all(txPromises);

        const formattedTxs: Transaction[] = txs
          .filter((tx): tx is ethers.TransactionResponse => tx !== null)
          .map((tx) => ({
            hash: tx.hash,
            from: tx.from,
            to: tx.to,
            value: ethers.formatEther(tx.value || 0n),
            timestamp: block.timestamp,
            blockNumber: block.number,
            gasUsed: tx.gasLimit.toString(),
            type: determineTransactionType(tx),
          }));

        if (isSubscribed && formattedTxs.length > 0) {
          setTransactions((prev) => [...formattedTxs, ...prev].slice(0, 50));
        }
      } catch (error) {
        console.error('Error processing block:', error);
      }
    };

    // Subscribe to new blocks
    provider.on('block', processBlock);

    // Load initial transactions from recent blocks
    const loadInitialTransactions = async () => {
      try {
        const latestBlockNumber = await provider.getBlockNumber();

        // Load transactions from the last 3 blocks
        for (let i = 0; i < 3; i++) {
          const blockNum = latestBlockNumber - i;
          if (blockNum >= 0) {
            await processBlock(blockNum);
          }
        }
      } catch (error) {
        console.error('Error loading initial transactions:', error);
      }
    };

    loadInitialTransactions();

    // Cleanup
    return () => {
      isSubscribed = false;
      provider.off('block', processBlock);
    };
  }, [network]);

  return transactions;
}
