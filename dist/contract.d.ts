import { Fragment, FunctionFragment, JsonFragment } from '@ethersproject/abi';
export declare class Contract {
    private _address;
    private _abi;
    private _functions;
    get address(): string;
    get abi(): Fragment[];
    get functions(): FunctionFragment[];
    constructor(address: string, abi: JsonFragment[] | string[] | Fragment[]);
    [method: string]: any;
}
