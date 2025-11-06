"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { NetworkType, DEFAULT_NETWORK } from "@/lib/somnia-config";
import { blockchainProvider } from "@/lib/blockchain-provider";

interface NetworkContextType {
  network: NetworkType;
  setNetwork: (network: NetworkType) => void;
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

export function NetworkProvider({ children }: { children: ReactNode }) {
  const [network, setNetworkState] = useState<NetworkType>(DEFAULT_NETWORK);

  const setNetwork = (newNetwork: NetworkType) => {
    setNetworkState(newNetwork);
    blockchainProvider.setCurrentNetwork(newNetwork);
  };

  return (
    <NetworkContext.Provider value={{ network, setNetwork }}>
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetwork() {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error("useNetwork must be used within NetworkProvider");
  }
  return context;
}
