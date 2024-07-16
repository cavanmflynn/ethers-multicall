import { assert } from 'chai';
import { ethers } from 'ethers';
import { Contract, Provider } from '../src';

const rpcUrl = 'https://base-pokt.nodies.app';
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const ethcallProvider = new Provider(provider, 8453);

describe('base network', () => {
    const addresses = [
        '0xfA980cEd6895AC314E7dE34Ef1bFAE90a5AdD21b',
        '0x1C7a460413dD4e964f96D8dFC56E7223cE88CD85'
    ];

    it('should retrieve totalSupply both of the tokens successfully', async () => {
        const abi = ['function totalSupply() public view returns (uint256)'];
        const seamContract = new Contract(addresses[1], abi);

        const calls = [seamContract.totalSupply()];
        const [seamSupply] = await ethcallProvider.all(calls);

        assert.equal(seamSupply.toString(), '100000000000000000000000000');
    });

    it('should returns symbol and decimals', async () => {
        const abi = [
            'function symbol() public view returns (string)',
            'function decimals() public view returns (uint8)',
        ];
        const primeContract = new Contract(addresses[0], abi);
        const seamContract = new Contract(addresses[1], abi);

        const calls = [primeContract.symbol(), seamContract.symbol(), primeContract.decimals(), seamContract.decimals()];
        const [
            primeSymbol,
            seamSymbol,
            primeDecimals,
            seamDecimals
        ] = await ethcallProvider.all(calls);

        assert.equal(primeSymbol, 'PRIME');
        assert.equal(seamSymbol, 'SEAM');
        assert.equal(primeDecimals.toString(), '18');
        assert.equal(seamDecimals.toString(), '18');
    });
});
