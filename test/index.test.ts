import {InfuraProvider} from '@ethersproject/providers';
import { assert } from 'chai';
import {BigNumber} from 'ethers';
import {Contract, createMulticallProvider, MulticallProvider} from '../src';

const provider = new InfuraProvider('mainnet');
const ethcallProvider = createMulticallProvider(provider, 1);

it('human readable abi', async () => {
  const abi = [
      'function totalSupply() public view returns (uint256)',
      'function symbol() public view returns(string)'
  ];
    const YFI = '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e';
    const UNI = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984';

    const yfiContract = new Contract(YFI, abi);
    const uniContract = new Contract(UNI, abi);

  const [yfiSupply, uniSymbol] = await ethcallProvider.all([
      yfiContract.methods.totalSupply<BigNumber>(),
      uniContract.methods.symbol<string>()
  ]);

  assert.equal(yfiSupply.toString(), '36666000000000000000000');
  assert.equal(uniSymbol, 'UNI');
});

it('human readable abi no types', async () => {
    const abi = [
        'function totalSupply() public view returns (uint256)',
        'function symbol() public view returns(string)'
    ];
    const YFI = '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e';
    const UNI = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984';

    const yfiContract = new Contract(YFI, abi);
    const uniContract = new Contract(UNI, abi);

    const [yfiSupply, uniSymbol] = await ethcallProvider.all([
        yfiContract.totalSupply(),
        uniContract.symbol()
    ]);

    assert.equal(yfiSupply.toString(), '36666000000000000000000');
    assert.equal(uniSymbol, 'UNI');
});

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
});
