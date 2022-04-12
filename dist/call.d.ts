import { ethers } from 'ethers';
import { ContractCall } from './types';
export declare function all<T extends any[] = any[]>(calls: ContractCall[], multicallAddress: string, provider: ethers.providers.Provider): Promise<T>;
