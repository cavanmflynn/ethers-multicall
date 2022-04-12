"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEthBalance = void 0;
var multicall_1 = require("./abi/multicall");
var contract_1 = require("./contract");
function getEthBalance(address, multicallAddress) {
    var multicall = new contract_1.Contract(multicallAddress, multicall_1.multicallAbi);
    return multicall.getEthBalance(address);
}
exports.getEthBalance = getEthBalance;
