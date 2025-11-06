# Somnia Data Streams Integration Guide

This guide explains how to integrate the real Somnia Data Streams SDK to replace the mock data.

## Current Status

The app currently runs in **mock mode** with simulated transactions and statistics. This demonstrates the UI/UX without requiring testnet access.

## Integration Steps

### 1. Install SDS SDK

Once the official Somnia Data Streams SDK is available:

```bash
pnpm add @somnia-network/data-streams
# Or whatever the actual package name is
```

### 2. Configure Environment

Update `.env.local`:

```bash
NEXT_PUBLIC_MOCK_MODE=false
NEXT_PUBLIC_SOMNIA_RPC=https://dream-rpc.somnia.network
# Add any required API keys
```

### 3. Update `lib/somnia-config.ts`

Initialize the SDS client:

```typescript
import { SomniaDataStreams } from '@somnia-network/data-streams';

export const sdsClient = new SomniaDataStreams({
  network: 'testnet',
  rpcUrl: process.env.NEXT_PUBLIC_SOMNIA_RPC,
  // Add any required configuration
});

export const MOCK_MODE = process.env.NEXT_PUBLIC_MOCK_MODE === 'true';
```

### 4. Update `hooks/useTransactions.ts`

Replace the mock implementation with real SDS:

```typescript
import { sdsClient, MOCK_MODE } from '@/lib/somnia-config';
import { ethers } from 'ethers';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (MOCK_MODE) {
      // Keep existing mock implementation
      return;
    }

    // Real SDS implementation
    const stream = sdsClient.transactions.subscribe({
      network: 'testnet',
      filters: {
        includeContracts: true,
        includeTransfers: true,
      }
    });

    stream.on('transaction', (tx) => {
      const formattedTx: Transaction = {
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        value: ethers.formatEther(tx.value || '0'),
        timestamp: tx.timestamp,
        blockNumber: tx.blockNumber,
        gasUsed: tx.gasUsed.toString(),
        type: determineTransactionType(tx),
      };

      setTransactions((prev) => [formattedTx, ...prev].slice(0, 50));
    });

    return () => stream.unsubscribe();
  }, []);

  return transactions;
}

function determineTransactionType(tx: any): Transaction['type'] {
  if (tx.to === null) return 'contract';
  // Add logic to detect NFT transfers
  if (tx.logs?.some(log => log.topics[0] === NFT_TRANSFER_SIGNATURE)) {
    return 'nft';
  }
  return 'transfer';
}
```

### 5. Update `hooks/useStats.ts`

Replace mock stats with real SDS metrics:

```typescript
import { sdsClient, MOCK_MODE } from '@/lib/somnia-config';

export function useStats() {
  const [stats, setStats] = useState<Stats>(initialStats);

  useEffect(() => {
    if (MOCK_MODE) {
      // Keep existing mock implementation
      return;
    }

    // Real SDS implementation
    const statsStream = sdsClient.stats.subscribe({
      metrics: ['tps', 'totalTransactions', 'activeAddresses', 'gasPrice', 'latestBlock'],
      updateInterval: 3000,
    });

    statsStream.on('update', (data) => {
      setStats({
        tps: data.transactionsPerSecond,
        totalTransactions: data.totalTransactions,
        activeAddresses: data.uniqueAddresses,
        avgGasPrice: ethers.formatUnits(data.averageGasPrice, 'gwei'),
        latestBlock: data.latestBlockNumber,
      });
    });

    return () => statsStream.unsubscribe();
  }, []);

  return stats;
}
```

## SDS Features to Explore

Once integrated, consider adding these advanced features:

### Filtered Streams
```typescript
// Only show high-value transactions
const stream = sdsClient.transactions.subscribe({
  filters: {
    minValue: ethers.parseEther('1.0'),
  }
});
```

### Event Subscriptions
```typescript
// Subscribe to specific contract events
const eventStream = sdsClient.events.subscribe({
  address: CONTRACT_ADDRESS,
  topics: [EVENT_SIGNATURE],
});
```

### Block Subscriptions
```typescript
// React to new blocks
const blockStream = sdsClient.blocks.subscribe();
blockStream.on('block', (block) => {
  // Update UI with new block data
});
```

### Historical Data
```typescript
// Fetch past transactions for initial state
const historicalTxs = await sdsClient.transactions.getRange({
  fromBlock: latestBlock - 100,
  toBlock: latestBlock,
});
```

## Testing

1. Start with mock mode enabled
2. Verify UI works correctly with mock data
3. Switch to real SDS mode
4. Compare behavior - should feel identical
5. Monitor console for any SDS errors

## Performance Tips

- **Limit displayed items**: The UI shows max 50 transactions
- **Debounce updates**: Stats update every 3 seconds, not on every transaction
- **Cleanup subscriptions**: Always unsubscribe in cleanup functions
- **Error handling**: Wrap SDS calls in try-catch blocks

## Common Issues

### "Module not found: @somnia-network/data-streams"
The SDK package name might be different. Check the official docs for the correct import.

### Subscription never receives data
- Verify you're connected to testnet
- Check network configuration in `somnia-config.ts`
- Ensure testnet is active and producing blocks

### Too many updates causing lag
- Increase the debounce interval
- Reduce the number of visible transactions
- Use React.memo() on expensive components

## Resources

- [SDS Documentation](https://docs.somnia.network/somnia-data-streams)
- [SDS Quickstart](https://docs.somnia.network/somnia-data-streams/getting-started/quickstart)
- [Somnia Testnet Explorer](https://somnia-devnet.socialscan.io)
