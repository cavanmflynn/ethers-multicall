import { ethers } from 'ethers';

export interface ContractCall {
  contract: {
    address: string;
  };
  name: string;
  inputs: ethers.utils.ParamType[];
  outputs: ethers.utils.ParamType[];
  params: any[];
}
