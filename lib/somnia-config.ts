// Somnia Network Configuration
export type NetworkType = 'testnet' | 'mainnet';

export interface NetworkConfig {
  name: string;
  rpcUrl: string;
  wsUrl?: string;
  chainId: number;
  explorerUrl: string;
  currency: string;
}

export const NETWORKS: Record<NetworkType, NetworkConfig> = {
  testnet: {
    name: 'Somnia Testnet',
    rpcUrl: 'https://dream-rpc.somnia.network',
    chainId: 50311,
    explorerUrl: 'https://somnia-devnet.socialscan.io',
    currency: 'STT',
  },
  mainnet: {
    name: 'Somnia Mainnet',
    // TODO: Update these values when Somnia mainnet launches
    // Get official values from https://docs.somnia.network/
    rpcUrl: 'https://rpc.somnia.network', // Replace with actual mainnet RPC
    chainId: 0, // Replace with actual mainnet chain ID
    explorerUrl: 'https://explorer.somnia.network', // Replace with actual explorer
    currency: 'STT',
  },
};

export const DEFAULT_NETWORK: NetworkType = 'testnet';
