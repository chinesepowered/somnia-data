export interface Transaction {
  hash: string;
  from: string;
  to: string | null;
  value: string;
  timestamp: number;
  blockNumber: number;
  gasUsed: string;
  type: 'transfer' | 'contract' | 'nft';
}

export interface BlockData {
  number: number;
  timestamp: number;
  transactions: number;
  gasUsed: string;
}

export interface Stats {
  tps: number;
  totalTransactions: number;
  activeAddresses: number;
  avgGasPrice: string;
  latestBlock: number;
}
