import { Fragment, FunctionFragment, JsonFragment } from '@ethersproject/abi';

export class Contract {
  private _address: string;
  private _abi: Fragment[];
  private _functions: FunctionFragment[];

  get address() {
    return this._address;
  }

  get abi() {
    return this._abi;
  }

  get functions() {
    return this._functions;
  }

  constructor(address: string, abi: JsonFragment[] | string[] | Fragment[]) {
    this._address = address;

    this._abi = toFragment(abi);

    this._functions = this._abi.filter(x => x.type === 'function').map(x => FunctionFragment.from(x));
    const callFunctions = this._functions.filter(x => x.stateMutability === 'pure' || x.stateMutability === 'view');

    for (const callFunction of callFunctions) {
      const { name } = callFunction;
      const getCall = makeCallFunction(this, name);
      if (!this[name]) {
        defineReadOnly(this, name, getCall);
      }
    }
  }

  [method: string]: any;
}

function toFragment(abi: JsonFragment[] | string[] | Fragment[]): Fragment[] {
  return abi.map((item: JsonFragment | string | Fragment) => Fragment.from(item));
}

function makeCallFunction(contract: Contract, name: string) {
  return (...params: any[]) => {
    const { address } = contract;
    const { inputs } = contract.functions.find(f => f.name === name);
    const { outputs } = contract.functions.find(f => f.name === name);
    return {
      contract: {
        address,
      },
      name,
      inputs,
      outputs,
      params,
    };
  };
}

function defineReadOnly(object: object, name: string, value: unknown) {
  Object.defineProperty(object, name, {
    enumerable: true,
    value,
    writable: false,
  });
}
