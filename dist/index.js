"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const soap = __importStar(require("soap"));
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
const port = 8000;
const app = (0, express_1.default)();
const services = {
    TrasmissioneFatture_service: {
        TrasmissioneFatture_port: {
            RicevutaConsegna: async (args) => console.log(args),
            NotificaMancataConsegna: async (args) => console.log(args),
            NotificaScarto: async (args) => console.log(args),
            NotificaEsito: async (args) => console.log(args),
            NotificaDecorrenzaTermini: async (args) => console.log(args),
            AttestazioneTrasmissioneFattura: async (args) => console.log(args),
        },
    },
};
const soapWsdl = fs_1.default.readFileSync(`${__dirname}/TrasmissioneFatture_v1.1.wsdl`, "utf8");
app.listen(port, () => {
    soap.listen(app, {
        path: "/wsdl",
        services: services,
        xml: soapWsdl,
        callback: () => {
            console.log(`🚀 Soap Server Ready. Test on http://localhost:${port}/wsdl?wsdl`);
        },
    });
});
//# sourceMappingURL=index.js.map