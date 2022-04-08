import { ParamType } from '@ethersproject/abi';

export interface ContractCall {
  contract: {
    address: string;
  };
  name: string;
  inputs: ParamType[];
  outputs: ParamType[];
  params: any[];
}
