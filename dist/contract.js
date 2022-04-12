"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract = void 0;
var abi_1 = require("@ethersproject/abi");
var ethers_1 = require("ethers");
var Contract = /** @class */ (function () {
    function Contract(address, abi) {
        this._address = address;
        this._abi = toFragment(abi);
        this._functions = this._abi.filter(function (x) { return x.type === 'function'; }).map(function (x) { return abi_1.FunctionFragment.from(x); });
        var callFunctions = this._functions.filter(function (x) { return x.stateMutability === 'pure' || x.stateMutability === 'view'; });
        for (var _i = 0, callFunctions_1 = callFunctions; _i < callFunctions_1.length; _i++) {
            var callFunction = callFunctions_1[_i];
            var name = callFunction.name;
            var getCall = makeCallFunction(this, name);
            if (!this[name]) {
                defineReadOnly(this, name, getCall);
            }
        }
    }
    Object.defineProperty(Contract.prototype, "address", {
        get: function () {
            return this._address;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Contract.prototype, "abi", {
        get: function () {
            return this._abi;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Contract.prototype, "functions", {
        get: function () {
            return this._functions;
        },
        enumerable: false,
        configurable: true
    });
    return Contract;
}());
exports.Contract = Contract;
function toFragment(abi) {
    return abi.map(function (item) { return ethers_1.utils.Fragment.from(item); });
}
function makeCallFunction(contract, name) {
    return function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        var address = contract.address;
        var inputs = contract.functions.find(function (f) { return f.name === name; }).inputs;
        var outputs = contract.functions.find(function (f) { return f.name === name; }).outputs;
        return {
            contract: {
                address: address,
            },
            name: name,
            inputs: inputs,
            outputs: outputs,
            params: params,
        };
    };
}
function defineReadOnly(object, name, value) {
    Object.defineProperty(object, name, {
        enumerable: true,
        value: value,
        writable: false,
    });
}
