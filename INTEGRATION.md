# Real-Time Blockchain Integration Guide

This document explains how Somnia Pulse connects to live blockchain data.

## How It Works

Somnia Pulse uses **ethers.js** to connect directly to Somnia blockchain via RPC. It subscribes to new block events and processes real transactions as they're mined.

### No Wallet Required

Since we're only **reading** blockchain data (not sending transactions), you don't need:
- ❌ A wallet
- ❌ Private keys
- ❌ Testnet or mainnet tokens (STT)
- ❌ Any configuration or API keys

Just run the app and it connects automatically!

## Network Configuration

The app supports both Somnia testnet and mainnet. Configuration is in `lib/somnia-config.ts`:

```typescript
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
    rpcUrl: 'https://rpc.somnia.network', // Update with actual mainnet RPC
    chainId: 0, // Update with actual mainnet chain ID
    explorerUrl: 'https://explorer.somnia.network', // Update with actual explorer
    currency: 'STT',
  },
};
```

### Updating Mainnet Configuration

When Somnia mainnet launches, update these values:
1. `rpcUrl` - Official mainnet RPC endpoint
2. `chainId` - Mainnet chain ID
3. `explorerUrl` - Mainnet block explorer URL

## Data Flow

### 1. Block Subscription

```typescript
// In hooks/useTransactions.ts and hooks/useStats.ts
const provider = blockchainProvider.getProvider(network);

// Subscribe to new blocks
provider.on('block', async (blockNumber) => {
  const block = await provider.getBlock(blockNumber, true);
  // Process transactions...
});
```

### 2. Transaction Processing

For each new block:
1. Fetch full block data with transactions
2. Extract first 10 transactions (for performance)
3. Determine transaction type (transfer, contract, NFT)
4. Format and display in UI

```typescript
const formattedTx: Transaction = {
  hash: tx.hash,
  from: tx.from,
  to: tx.to,
  value: ethers.formatEther(tx.value || 0n),
  timestamp: block.timestamp,
  blockNumber: block.number,
  gasUsed: tx.gasLimit.toString(),
  type: determineTransactionType(tx),
};
```

### 3. Statistics Calculation

Real-time stats are calculated from live data:
- **TPS**: Transactions per second based on last 10 blocks
- **Total Transactions**: Cumulative count from observed blocks
- **Active Addresses**: Unique addresses seen in recent blocks
- **Gas Price**: From `provider.getFeeData()`
- **Latest Block**: Current block number

## Network Switching

Users can switch between testnet and mainnet using the UI toggle. This:

1. Updates the `NetworkContext`
2. Triggers `useEffect` in hooks (network dependency)
3. Unsubscribes from old provider
4. Subscribes to new provider
5. Loads fresh data from new network

The switch happens instantly with no page reload.

## Performance Optimizations

### Limiting Transaction Display

Only first 10 transactions per block are processed to avoid overwhelming the UI:

```typescript
block.transactions.slice(0, 10)
```

### Maintaining Maximum List Size

Transaction feed is capped at 50 items:

```typescript
setTransactions((prev) => [...formattedTxs, ...prev].slice(0, 50));
```

### Efficient Block Time Tracking

Only last 10 block timestamps are kept for TPS calculation:

```typescript
return updated.slice(-10);
```

## Error Handling

All blockchain calls are wrapped in try-catch blocks:

```typescript
try {
  const block = await provider.getBlock(blockNumber, true);
  // Process block...
} catch (error) {
  console.error('Error processing block:', error);
}
```

Errors are logged to console but don't crash the app. The UI continues to function and will recover when the next block arrives.

## Adding Custom RPC Endpoints

To use a custom RPC endpoint (e.g., for development or private nodes):

1. Update `lib/somnia-config.ts`:
```typescript
testnet: {
  rpcUrl: 'https://your-custom-rpc-endpoint.com',
  // ...
}
```

2. No other changes needed - the app will use your endpoint automatically

## Future Enhancements

### WebSocket Support

For even faster updates, you could add WebSocket RPC:

```typescript
export const NETWORKS: Record<NetworkType, NetworkConfig> = {
  testnet: {
    wsUrl: 'wss://dream-rpc.somnia.network',
    // ...
  }
};

// In blockchain-provider.ts
const provider = new ethers.WebSocketProvider(config.wsUrl);
```

### Transaction Filtering

Add filters to show only specific transaction types:

```typescript
const processBlock = async (blockNumber, filters) => {
  // Filter by value, address, contract, etc.
};
```

### Historical Data Loading

Load transactions from older blocks on initial load:

```typescript
for (let i = 0; i < 100; i++) {
  const blockNum = latestBlockNumber - i;
  await processBlock(blockNum);
}
```

## Troubleshooting

### No transactions appearing

**Possible causes:**
1. Network is not producing blocks
2. RPC endpoint is down or slow
3. All blocks are empty (no transactions)

**Solutions:**
- Check network status in explorer
- Verify RPC URL is correct
- Try switching networks
- Check browser console for errors

### Stats not updating

**Check:**
- Network connection is stable
- No console errors
- Latest block number is incrementing

### High memory usage

If the app runs for a long time, clear old data:
- Reduce transaction list size
- Limit block time history
- Reset stats periodically

## Code References

- **Network Config**: `lib/somnia-config.ts:13`
- **Blockchain Provider**: `lib/blockchain-provider.ts:6`
- **Network Context**: `contexts/NetworkContext.tsx:10`
- **Transaction Hook**: `hooks/useTransactions.ts:24`
- **Stats Hook**: `hooks/useStats.ts:17`

## Resources

- [Ethers.js Docs](https://docs.ethers.org/)
- [Somnia Docs](https://docs.somnia.network/)
- [Somnia Explorer](https://somnia-devnet.socialscan.io)
