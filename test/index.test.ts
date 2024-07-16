import { InfuraProvider } from '@ethersproject/providers';
import { assert } from 'chai';
import { Contract, Provider } from '../src';

const provider = new InfuraProvider('mainnet');
const ethcallProvider = new Provider(provider, 1);

describe('ethereum network', () => {
  it('human readable abi', async () => {
    const abi = ['function totalSupply() public view returns (uint256)'];
    const addresses = [
      '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
      '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'
    ];

    const yfiContract = new Contract(addresses[0], abi);
    const uniContract = new Contract(addresses[1], abi);

    const calls = [yfiContract.totalSupply(), uniContract.totalSupply()];
    const [yfiSupply, uniSupply] = await ethcallProvider.all(calls);

    assert.equal(yfiSupply.toString(), '36666000000000000000000');
    assert.equal(uniSupply.toString(), '1000000000000000000000000000');
  }).timeout(5_000);

  it('json abi', async () => {
    const abi = [
      {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256'
          }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      }
    ];
    const addresses = [
      '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
      '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'
    ];

    const yfiContract = new Contract(addresses[0], abi);
    const uniContract = new Contract(addresses[1], abi);

    const calls = [yfiContract.totalSupply(), uniContract.totalSupply()];
    const [yfiSupply, uniSupply] = await ethcallProvider.all(calls);

    assert.equal(yfiSupply.toString(), '36666000000000000000000');
    assert.equal(uniSupply.toString(), '1000000000000000000000000000');
  })
})
