import { Provider as EthersProvider } from '@ethersproject/abstract-provider';
import { all } from './call';
import { getEthBalance } from './calls';
import { ContractCall } from './types';

export class Provider {
  private _provider: EthersProvider;
  private _multicallAddress: string;

  constructor(provider: EthersProvider, chainId?: number) {
    this._provider = provider;
    this._multicallAddress = getAddressForChainId(chainId);
  }

  public async init() {
    // Only required if `chainId` was not provided in constructor
    this._multicallAddress = await getAddress(this._provider);
  }

  public getEthBalance(address: string) {
    if (!this._provider) {
      throw new Error('Provider should be initialized before use.');
    }
    return getEthBalance(address, this._multicallAddress);
  }

  public async all<T extends any[] = any[]>(calls: ContractCall[]) {
    if (!this._provider) {
      throw new Error('Provider should be initialized before use.');
    }
    return all<T>(calls, this._multicallAddress, this._provider);
  }
}

const multicallAddresses = {
  1: '0xcA11bde05977b3631167028862bE2a173976CA11',
  5: '0xcA11bde05977b3631167028862bE2a173976CA11',
  56: '0xcA11bde05977b3631167028862bE2a173976CA11',
  97: '0xcA11bde05977b3631167028862bE2a173976CA11',
  100: '0xcA11bde05977b3631167028862bE2a173976CA11',
  128: '0xcA11bde05977b3631167028862bE2a173976CA11',
  137: '0xcA11bde05977b3631167028862bE2a173976CA11', // Polygon
  250: '0xcA11bde05977b3631167028862bE2a173976CA11',
  8453: '0xca11bde05977b3631167028862be2a173976ca11', // BASE
  42161: '0xcA11bde05977b3631167028862bE2a173976CA11',
  43114: '0xcA11bde05977b3631167028862bE2a173976CA11',
  80001: '0xcA11bde05977b3631167028862bE2a173976CA11',
  80002: '0xcA11bde05977b3631167028862bE2a173976CA11',
  84532: '0xcA11bde05977b3631167028862bE2a173976CA11', // BASE Sepolia
};

export function setMulticallAddress(chainId: number, address: string) {
  multicallAddresses[chainId] = address;
}

function getAddressForChainId(chainId: number) {
  return multicallAddresses[chainId];
}

async function getAddress(provider: EthersProvider) {
  const { chainId } = await provider.getNetwork();
  return getAddressForChainId(chainId);
}
