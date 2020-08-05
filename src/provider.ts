import { ethers } from 'ethers';
import { all } from './call';
import { getEthBalance } from './calls';
import { ContractCall } from './types';

export class Provider {
  private _provider: ethers.providers.Provider;
  private _multicallAddress: string;

  constructor() {
    this._provider = null;
    this._multicallAddress = null;
  }

  public async init(provider: ethers.providers.Provider) {
    this._provider = provider;
    this._multicallAddress = await getAddress(provider);
  }

  public getEthBalance(address: string) {
    if (!this._provider) {
      throw new Error('Provider should be initialized before use.');
    }
    return getEthBalance(address, this._multicallAddress);
  }

  public async all(calls: ContractCall[]) {
    if (!this._provider) {
      throw new Error('Provider should be initialized before use.');
    }
    return all(calls, this._multicallAddress, this._provider);
  }
}

async function getAddress(provider: ethers.providers.Provider) {
  const addresses = {
    1: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
    4: '0x42ad527de7d4e9d9d011ac45b31d8551f8fe9821',
    42: '0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a',
    100: '0xb5b692a88bdfc81ca69dcb1d924f59f0413a602a',
    1337: '0x77dca2c955b15e9de4dbbcf1246b4b85b651e50e',
  };
  const { chainId } = await provider.getNetwork();
  return addresses[chainId];
}
