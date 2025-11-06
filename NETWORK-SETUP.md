# Network Configuration Guide

## Overview

Somnia Pulse connects to live Somnia blockchain networks via RPC. This guide explains how the network configuration works and how to update it.

## Current Networks

The app is configured for both testnet and mainnet in `lib/somnia-config.ts`:

### Testnet (Default)
- **Name**: Somnia Testnet
- **RPC**: https://dream-rpc.somnia.network
- **Chain ID**: 50311
- **Explorer**: https://somnia-devnet.socialscan.io
- **Currency**: STT
- **Status**: ✅ Active and working

### Mainnet
- **Name**: Somnia Mainnet
- **RPC**: TBD (update when available)
- **Chain ID**: TBD (update when available)
- **Explorer**: TBD (update when available)
- **Currency**: STT
- **Status**: ⚠️  Requires configuration when mainnet launches

## Updating Mainnet Configuration

When Somnia mainnet launches, update `lib/somnia-config.ts`:

```typescript
mainnet: {
  name: 'Somnia Mainnet',
  rpcUrl: 'https://actual-mainnet-rpc.somnia.network', // Update this
  chainId: 12345, // Update with actual chain ID
  explorerUrl: 'https://explorer.somnia.network', // Update this
  currency: 'STT',
},
```

## Adding New Networks

To add additional networks (e.g., a local development network):

1. **Update type definition**:
```typescript
export type NetworkType = 'testnet' | 'mainnet' | 'devnet';
```

2. **Add network configuration**:
```typescript
devnet: {
  name: 'Local Devnet',
  rpcUrl: 'http://localhost:8545',
  chainId: 31337,
  explorerUrl: '',
  currency: 'STT',
}
```

3. **Update UI** in `components/NetworkSwitcher.tsx`:
```typescript
const networks = [
  { key: 'testnet', label: 'Testnet', color: 'from-blue-500 to-cyan-500' },
  { key: 'mainnet', label: 'Mainnet', color: 'from-purple-500 to-pink-500' },
  { key: 'devnet', label: 'Devnet', color: 'from-green-500 to-emerald-500' },
];
```

## Network Switching

Users can switch networks at runtime using the toggle in the hero section:

1. Click desired network button
2. App unsubscribes from current provider
3. Connects to new provider
4. Loads data from new network
5. UI updates instantly

No page reload required!

## Connection Details

### Read-Only Access

The app only reads blockchain data:
- Subscribes to new blocks
- Fetches block and transaction data
- Queries network statistics
- **Never sends transactions**

This means:
- ✅ No wallet needed
- ✅ No private keys
- ✅ No gas fees
- ✅ No tokens required

### Provider Management

Providers are managed via `lib/blockchain-provider.ts`:

```typescript
class BlockchainProvider {
  private providers: Map<NetworkType, ethers.JsonRpcProvider> = new Map();

  getProvider(network: NetworkType): ethers.JsonRpcProvider {
    if (!this.providers.has(network)) {
      const config = NETWORKS[network];
      const provider = new ethers.JsonRpcProvider(config.rpcUrl, {
        chainId: config.chainId,
        name: config.name,
      });
      this.providers.set(network, provider);
    }
    return this.providers.get(network)!;
  }
}
```

Providers are cached and reused for efficiency.

## Testing Network Configuration

To verify a network is working:

1. Update the configuration
2. Run the app: `pnpm dev`
3. Switch to the network in UI
4. Check browser console for errors
5. Verify transactions appear
6. Confirm block number increments

## Troubleshooting

### Network won't connect

**Symptoms**: No transactions, stats don't update

**Solutions**:
- Verify RPC URL is correct and accessible
- Check chain ID matches network
- Ensure network is producing blocks
- Try testnet to confirm app works

### Wrong chain ID error

**Symptoms**: Console errors about chain ID mismatch

**Solution**: Update `chainId` in config to match actual network

### Slow or no data

**Possible causes**:
- RPC endpoint is rate-limited
- Network is congested
- Connection is slow

**Solutions**:
- Use a different RPC endpoint
- Try another network
- Check network status in explorer

## Advanced Configuration

### Custom RPC Provider

For advanced use cases, you can customize the provider:

```typescript
// Use with API key
const provider = new ethers.JsonRpcProvider(
  `${config.rpcUrl}?apiKey=${process.env.API_KEY}`,
  config.chainId
);

// Use WebSocket for faster updates
const provider = new ethers.WebSocketProvider(
  config.wsUrl,
  config.chainId
);
```

### Rate Limiting

If you hit rate limits, add delay between requests:

```typescript
await new Promise(resolve => setTimeout(resolve, 100));
```

Or use a provider with higher limits.

### Multiple RPC Endpoints

For reliability, use multiple RPC endpoints:

```typescript
const endpoints = [
  'https://rpc1.somnia.network',
  'https://rpc2.somnia.network',
  'https://rpc3.somnia.network',
];

// Rotate through endpoints on error
```

## Resources

- [Somnia Network Documentation](https://docs.somnia.network/)
- [Ethers.js Provider Docs](https://docs.ethers.org/v6/api/providers/)
- [JSON-RPC Specification](https://ethereum.org/en/developers/docs/apis/json-rpc/)
