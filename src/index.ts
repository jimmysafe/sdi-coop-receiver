import * as soap from "soap";
import fs from "fs";
import express from "express";

const port = 8000;
const app = express();

const services = {
  TrasmissioneFatture_service: {
    TrasmissioneFatture_port: {
      RicevutaConsegna: async (args: any) => console.log(args),
      NotificaMancataConsegna: async (args: any) => console.log(args),
      NotificaScarto: async (args: any) => console.log(args),
      NotificaEsito: async (args: any) => console.log(args),
      NotificaDecorrenzaTermini: async (args: any) => console.log(args),
      AttestazioneTrasmissioneFattura: async (args: any) => console.log(args),
    },
  },
};

const soapWsdl = fs.readFileSync(
  `${__dirname}/TrasmissioneFatture_v1.1.wsdl`,
  "utf8"
);

app.get("/", (_: any, res: any) => {
  console.log("HIT HOMEPAGE");
  res.send("ok dude");
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
