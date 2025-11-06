"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTransactions } from "@/hooks/useTransactions";
import { TransactionCard } from "./TransactionCard";

export function ActivityFeed() {
  const transactions = useTransactions();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gradient mb-2">Live Transaction Stream</h2>
        <p className="text-gray-400">Watching the blockchain in real-time with zero latency</p>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {transactions.slice(0, 20).map((tx) => (
            <TransactionCard key={tx.hash} transaction={tx} />
          ))}
        </AnimatePresence>

        {transactions.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">⏳</div>
            <p className="text-gray-400">Connecting to Somnia blockchain...</p>
            <p className="text-sm text-gray-500 mt-2">
              Waiting for new blocks with transactions
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
