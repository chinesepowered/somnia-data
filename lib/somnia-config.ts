// Somnia Testnet Configuration
export const SOMNIA_CONFIG = {
  rpcUrl: "https://dream-rpc.somnia.network",
  chainId: 50311, // Somnia Testnet
  explorerUrl: "https://somnia-devnet.socialscan.io",
};

// Mock data for demo - Replace with actual SDS SDK integration
export const MOCK_MODE = true; // Set to false when using real SDS

// In production, initialize SDS like:
// import { SomniaDataStreams } from '@somnia-network/data-streams';
// export const sdsClient = new SomniaDataStreams({
//   network: 'testnet',
//   apiKey: process.env.NEXT_PUBLIC_SOMNIA_API_KEY,
// });
