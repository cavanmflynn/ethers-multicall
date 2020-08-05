# ethers-multicall

Make multiple Ethereum network requests in a single HTTP query. [ethcall](https://github.com/Destiner/ethcall) for ethers v5.

## API

* `Contract(address, abi)`: Create contract instance; calling `contract.callFuncName` will yield a `call` object
* `all(calls)`: Execute all calls in a single request
* `calls`: List of helper call methods
* `getEthBalance(address)`: Returns account ether balance

## Example

```ts
import { Contract, Provider } from 'ethers-multicall';
import { ethers } from 'ethers';

import erc20Abi from './abi/erc20.json';

const infuraKey = 'INSERT_YOUR_KEY_HERE';
const provider = new ethers.providers.InfuraProvider('mainnet', infuraKey);

const daiAddress = '0x6b175474e89094c44da98b954eedeac495271d0f';

async function call() {
  const ethcallProvider = new Provider(provider);

  await ethcallProvider.init(); // Only required when `chainId` is not provided in the `Provider` constructor

  const daiContract = new Contract(daiAddress, erc20Abi);

  const uniswapDaiPool = '0x2a1530c4c41db0b0b2bb646cb5eb1a67b7158667';

  const ethBalanceCall = ethcallProvider.getEthBalance(uniswapDaiPool);
  const daiBalanceCall = daiContract.balanceOf(uniswapDaiPool);

  const [ethBalance, daiBalance] = await ethcallProvider.all([ethBalanceCall, daiBalanceCall]);

  console.log('ETH Balance:', ethBalance.toString());
  console.log('DAI Balance:', daiBalance.toString());
}

call();
```
