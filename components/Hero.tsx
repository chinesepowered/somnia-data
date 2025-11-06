"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <div className="relative overflow-hidden border-b border-somnia-purple/20">
      <div className="absolute inset-0 bg-gradient-to-b from-somnia-purple/10 to-transparent" />

      <div className="container mx-auto px-4 py-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block mb-4"
          >
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-somnia-purple to-somnia-blue rounded-full flex items-center justify-center card-glow">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-gradient glow">
            Somnia Pulse
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-6">
            The Heartbeat of Somnia Blockchain
          </p>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience blockchain data like never before. Watch transactions flow in real-time,
            powered by Somnia Data Streams revolutionary instant data infrastructure.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="px-4 py-2 bg-somnia-purple/20 rounded-full border border-somnia-purple/50">
              <span className="text-sm font-medium">🔴 LIVE</span>
            </div>
            <div className="px-4 py-2 bg-somnia-blue/20 rounded-full border border-somnia-blue/50">
              <span className="text-sm font-medium">Somnia Testnet</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
