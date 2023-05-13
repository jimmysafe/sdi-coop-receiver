import * as soap from "soap";
import fs from "fs";
import express from "express";
import { TypesfileSdIType } from "src/types";
import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

const port = 8000;
const app = express();

const notifica = async (
  args: TypesfileSdIType,
  type: "success" | "failure" = "failure"
) => {
  try {
    console.log("Da SDI: ", args.IdentificativoSdI);
    await axios.post(`${process.env.SERVER_URL}/fte-notifica`, {
      Success: type === "success",
      ...args,
    });
  } catch (err) {
    console.log(err);
  }
};

const services = {
  TrasmissioneFatture_service: {
    TrasmissioneFatture_port: {
      RicevutaConsegna: async () => {},
      NotificaMancataConsegna: async () => {},
      NotificaScarto: async (args: any) => notifica(args),
      NotificaEsito: async (args: any) => notifica(args, "success"),
      NotificaDecorrenzaTermini: async () => {},
      AttestazioneTrasmissioneFattura: async () => {},
    },
  },
};

const soapWsdl = fs.readFileSync(
  `${__dirname}/TrasmissioneFatture_v1.1.wsdl`,
  "utf8"
);

app.get("/", (_: any, res: any) => {
  console.log("HIT HOMEPAGE");
  res.send(`online: ${process.env.SERVER_URL}`);
});

app.listen(port, () => {
  soap.listen(app, {
    path: "/wsdl",
    services: services,
    xml: soapWsdl,
    callback: () => {
      console.log(
        `🚀 Soap Server Ready. Test on http://localhost:${port}/wsdl?wsdl`
      );
    },
  });
});
