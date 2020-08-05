import { ethers } from 'ethers';
import { Abi } from './abi';
import { multicallAbi } from './abi/multicall';
import { ContractCall } from './types';

export async function all<T extends any[] = any[]>(
  calls: ContractCall[],
  multicallAddress: string,
  provider: ethers.providers.Provider,
): Promise<T> {
  const multicall = new ethers.Contract(multicallAddress, multicallAbi, provider);
  const callRequests = calls.map(call => {
    const callData = Abi.encode(call.name, call.inputs, call.params);
    return {
      target: call.contract.address,
      callData,
    };
  });
  const response = await multicall.aggregate(callRequests);
  const callCount = calls.length;
  const callResult = [] as T;
  for (let i = 0; i < callCount; i++) {
    const outputs = calls[i].outputs;
    const returnData = response.returnData[i];
    const params = Abi.decode(outputs, returnData);
    const result = outputs.length === 1 ? params[0] : params;
    callResult.push(result);
  }
  return callResult;
}
