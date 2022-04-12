"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Abi = void 0;
var ethers_1 = require("ethers");
var Abi = /** @class */ (function () {
    function Abi() {
    }
    Abi.encode = function (name, inputs, params) {
        var functionSignature = getFunctionSignature(name, inputs);
        var functionHash = ethers_1.ethers.utils.keccak256(ethers_1.ethers.utils.toUtf8Bytes(functionSignature));
        var functionData = functionHash.substring(2, 10);
        var abiCoder = new ethers_1.ethers.utils.AbiCoder();
        var argumentString = abiCoder.encode(inputs, params);
        var argumentData = argumentString.substring(2);
        var inputData = "0x" + functionData + argumentData;
        return inputData;
    };
    Abi.decode = function (outputs, data) {
        var abiCoder = new ethers_1.ethers.utils.AbiCoder();
        var params = abiCoder.decode(outputs, data);
        return params;
    };
    return Abi;
}());
exports.Abi = Abi;
function getFunctionSignature(name, inputs) {
    var types = [];
    for (var _i = 0, inputs_1 = inputs; _i < inputs_1.length; _i++) {
        var input = inputs_1[_i];
        if (input.type === 'tuple') {
            var tupleString = getFunctionSignature('', input.components);
            types.push(tupleString);
            continue;
        }
        if (input.type === 'tuple[]') {
            var tupleString = getFunctionSignature('', input.components);
            var arrayString = tupleString + "[]";
            types.push(arrayString);
            continue;
        }
        types.push(input.type);
    }
    var typeString = types.join(',');
    var functionSignature = name + "(" + typeString + ")";
    return functionSignature;
}
