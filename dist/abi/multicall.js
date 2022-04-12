"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multicallAbi = void 0;
exports.multicallAbi = [
    {
        constant: true,
        inputs: [
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'target',
                        type: 'address',
                    },
                    {
                        internalType: 'bytes',
                        name: 'callData',
                        type: 'bytes',
                    },
                ],
                internalType: 'struct Multicall.Call[]',
                name: 'calls',
                type: 'tuple[]',
            },
        ],
        name: 'aggregate',
        outputs: [
            {
                internalType: 'uint256',
                name: 'blockNumber',
                type: 'uint256',
            },
            {
                internalType: 'bytes[]',
                name: 'returnData',
                type: 'bytes[]',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [
            {
                internalType: 'uint256',
                name: 'blockNumber',
                type: 'uint256',
            },
        ],
        name: 'getBlockHash',
        outputs: [
            {
                internalType: 'bytes32',
                name: 'blockHash',
                type: 'bytes32',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'getCurrentBlockCoinbase',
        outputs: [
            {
                internalType: 'address',
                name: 'coinbase',
                type: 'address',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'getCurrentBlockDifficulty',
        outputs: [
            {
                internalType: 'uint256',
                name: 'difficulty',
                type: 'uint256',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'getCurrentBlockGasLimit',
        outputs: [
            {
                internalType: 'uint256',
                name: 'gaslimit',
                type: 'uint256',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'getCurrentBlockTimestamp',
        outputs: [
            {
                internalType: 'uint256',
                name: 'timestamp',
                type: 'uint256',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: 'addr',
                type: 'address',
            },
        ],
        name: 'getEthBalance',
        outputs: [
            {
                internalType: 'uint256',
                name: 'balance',
                type: 'uint256',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'getLastBlockHash',
        outputs: [
            {
                internalType: 'bytes32',
                name: 'blockHash',
                type: 'bytes32',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
];
