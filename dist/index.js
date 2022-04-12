"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMulticallAddress = exports.Provider = exports.Contract = void 0;
var contract_1 = require("./contract");
Object.defineProperty(exports, "Contract", { enumerable: true, get: function () { return contract_1.Contract; } });
var provider_1 = require("./provider");
Object.defineProperty(exports, "Provider", { enumerable: true, get: function () { return provider_1.Provider; } });
Object.defineProperty(exports, "setMulticallAddress", { enumerable: true, get: function () { return provider_1.setMulticallAddress; } });
exports.default = { Contract: contract_1.Contract, Provider: provider_1.Provider, setMulticallAddress: provider_1.setMulticallAddress };
