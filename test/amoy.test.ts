import { ethers } from 'ethers';
import { assert } from 'chai';
import { Contract, Provider } from '../src';

const rpcUrl = 'https://polygon-amoy.drpc.org'
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const ethcallProvider = new Provider(provider, 80002);

describe('amoy network', () => {
    it('should retrieve totalSupply both of the tokens successfully', async () => {
        const abi = ['function totalSupply() public view returns (uint256)'];
        const addresses = [
            '0x0Fd9e8d3aF1aaee056EB9e802c3A762a667b1904',
            '0x6EEBe75caf9c579B3FBA9030760B84050283b50a'
        ];

        const linkContract = new Contract(addresses[0], abi);
        const usdcContract = new Contract(addresses[1], abi);

        const calls = [linkContract.totalSupply(), usdcContract.totalSupply()];
        const [linkSupply, usdcSupply] = await ethcallProvider.all(calls);

        assert.equal(linkSupply.toString(), '10001000000000000000000000');
        assert.equal(usdcSupply.toString(), '100000000000000000000000000');
    })
})
