import { ethers } from 'ethers';
import { NetworkType, NETWORKS } from './somnia-config';

class BlockchainProvider {
  private providers: Map<NetworkType, ethers.JsonRpcProvider> = new Map();
  private currentNetwork: NetworkType = 'testnet';

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

  setCurrentNetwork(network: NetworkType) {
    this.currentNetwork = network;
  }

  getCurrentNetwork(): NetworkType {
    return this.currentNetwork;
  }

  getCurrentProvider(): ethers.JsonRpcProvider {
    return this.getProvider(this.currentNetwork);
  }
}

export const blockchainProvider = new BlockchainProvider();
