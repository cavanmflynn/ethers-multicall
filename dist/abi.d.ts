import { ethers } from 'ethers';
export declare class Abi {
    static encode(name: string, inputs: ethers.utils.ParamType[], params: any[]): string;
    static decode(outputs: ethers.utils.ParamType[], data: ethers.utils.BytesLike): ethers.utils.Result;
}
