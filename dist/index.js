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
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const port = 8000;
const app = (0, express_1.default)();
console.log(process.env.SERVER_URL);
const notifica = async (args, type = "failure") => {
    try {
        await axios_1.default.post(`${process.env.SERVER_URL}/fte-notifica`, Object.assign({ Success: type === "success" }, args));
    }
    catch (err) {
        console.log(err);
    }
};
const services = {
    TrasmissioneFatture_service: {
        TrasmissioneFatture_port: {
            RicevutaConsegna: async () => { },
            NotificaMancataConsegna: async () => { },
            NotificaScarto: async (args) => notifica(args),
            NotificaEsito: async (args) => notifica(args, "success"),
            NotificaDecorrenzaTermini: async () => { },
            AttestazioneTrasmissioneFattura: async () => { },
        },
    },
};
const soapWsdl = fs_1.default.readFileSync(`${__dirname}/TrasmissioneFatture_v1.1.wsdl`, "utf8");
app.get("/", (_, res) => {
    console.log("HIT HOMEPAGE");
    res.send("ok dude");
});
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