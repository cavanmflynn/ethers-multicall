import { assert } from 'chai';
import { ethers } from 'ethers';
import { Contract, Provider } from '../src';

const rpcUrl = 'https://polygon-pokt.nodies.app';
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const ethcallProvider = new Provider(provider, 137);

describe('polygon network', () => {
    const addresses = [
        '0x0000000000000000000000000000000000001010',
        '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619'
    ];

    it('should retrieve totalSupply both of the tokens successfully', async () => {
        const abi = ['function totalSupply() public view returns (uint256)'];

        const maticContract = new Contract(addresses[0], abi);

        const calls = [maticContract.totalSupply()];
        const [maticSupply] = await ethcallProvider.all(calls);

        assert.equal(maticSupply.toString(), '10000000000000000000000000000');
    });

    it('should returns symbol and decimals', async () => {
        const abi = [
            'function symbol() public view returns (string)',
            'function decimals() public view returns (uint8)',
        ];
        const maticContract = new Contract(addresses[0], abi);
        const wethContract = new Contract(addresses[1], abi);

        const calls = [maticContract.symbol(), wethContract.symbol(), maticContract.decimals(), wethContract.decimals()];
        const [
            maticSymbol,
            wethSymbol,
            maticDecimals,
            wethDecimals
        ] = await ethcallProvider.all(calls);

        assert.equal(maticSymbol, 'MATIC');
        assert.equal(wethSymbol, 'WETH');
        assert.equal(maticDecimals.toString(), '18');
        assert.equal(wethDecimals.toString(), '18');
    });
});
