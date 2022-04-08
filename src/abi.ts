import { AbiCoder, ParamType } from '@ethersproject/abi';
import { BytesLike } from '@ethersproject/bytes';
import { keccak256 } from '@ethersproject/keccak256';
import { toUtf8Bytes } from '@ethersproject/strings';

export class Abi {
  public static encode(name: string, inputs: ParamType[], params: any[]) {
    const functionSignature = getFunctionSignature(name, inputs);
    const functionHash = keccak256(toUtf8Bytes(functionSignature));
    const functionData = functionHash.substring(2, 10);
    const abiCoder = new AbiCoder();
    const argumentString = abiCoder.encode(inputs, params);
    const argumentData = argumentString.substring(2);
    const inputData = `0x${functionData}${argumentData}`;
    return inputData;
  }

  public static decode(outputs: ParamType[], data: BytesLike) {
    const abiCoder = new AbiCoder();
    const params = abiCoder.decode(outputs, data);
    return params;
  }
}

function getFunctionSignature(name: string, inputs: ParamType[]) {
  const types = [];
  for (const input of inputs) {
    if (input.type === 'tuple') {
      const tupleString = getFunctionSignature('', input.components);
      types.push(tupleString);
      continue;
    }
    if (input.type === 'tuple[]') {
      const tupleString = getFunctionSignature('', input.components);
      const arrayString = `${tupleString}[]`;
      types.push(arrayString);
      continue;
    }
    types.push(input.type);
  }
  const typeString = types.join(',');
  const functionSignature = `${name}(${typeString})`;
  return functionSignature;
}
