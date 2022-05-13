import { ParamType } from '@ethersproject/abi';

export interface ContractCall<T = any> {
  contract: {
    address: string;
  };
  name: string;
  inputs: ParamType[];
  outputs: ParamType[];
  params: any[];
}
