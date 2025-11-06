"use client";

import { motion } from "framer-motion";
import { Transaction } from "@/types";
import { useNetwork } from "@/contexts/NetworkContext";
import { NETWORKS } from "@/lib/somnia-config";

interface TransactionCardProps {
  transaction: Transaction;
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  const { network } = useNetwork();
  const config = NETWORKS[network];

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatValue = (value: string) => {
    const eth = parseFloat(value);
    if (eth === 0) return `0 ${config.currency}`;
    if (eth < 0.0001) return `<0.0001 ${config.currency}`;
    return `${eth.toFixed(4)} ${config.currency}`;
  };

  const getTypeIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'transfer': return '💸';
      case 'contract': return '📝';
      case 'nft': return '🎨';
      default: return '📦';
    }
  };

  const getTypeColor = (type: Transaction['type']) => {
    switch (type) {
      case 'transfer': return 'from-green-500/20 to-emerald-500/20 border-green-500/30';
      case 'contract': return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30';
      case 'nft': return 'from-purple-500/20 to-pink-500/20 border-purple-500/30';
      default: return 'from-gray-500/20 to-slate-500/20 border-gray-500/30';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -50, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.95 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={`bg-gradient-to-r ${getTypeColor(transaction.type)} backdrop-blur-sm rounded-lg p-4 border`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{getTypeIcon(transaction.type)}</span>
            <span className="text-xs text-gray-400 uppercase font-semibold">
              {transaction.type}
            </span>
            <span className="text-xs text-gray-500">Block #{transaction.blockNumber}</span>
          </div>

          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Hash:</span>
              <code className="text-somnia-blue font-mono">{formatAddress(transaction.hash)}</code>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-400">From:</span>
              <code className="text-gray-300 font-mono">{formatAddress(transaction.from)}</code>
            </div>

            {transaction.to && (
              <div className="flex items-center gap-2">
                <span className="text-gray-400">To:</span>
                <code className="text-gray-300 font-mono">{formatAddress(transaction.to)}</code>
              </div>
            )}
          </div>
        </div>

        <div className="text-right flex-shrink-0">
          <motion.div
            initial={{ scale: 1.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-lg font-bold text-white mb-1"
          >
            {formatValue(transaction.value)}
          </motion.div>
          <div className="text-xs text-gray-500">
            {new Date(transaction.timestamp * 1000).toLocaleTimeString()}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
