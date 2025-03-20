const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
//import { updateMockDatabase } from "./databasehelper.js";
const dbHelperFunctions = require("./databasehelper.js");
const PROTO_PATH = path.resolve(__dirname, "service.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition).myservice;

function returnFromXML(call, callback) {
  dbHelperFunctions.getDataFromDB(call.request.name, callback);
}

async function addToXML(call, callback) {
  dbHelperFunctions.updateMockDatabase(call.request.name);
  callback(null, { message: ` ${call.request.name}` });
}

// Implement the SendXML function
function sendXML(call, callback) {
  const xmlData = call.request.xmlData;
  console.log("Received XML:", xmlData);

  // Convert XML to JSON (optional)
  xml2js.parseString(xmlData, (err, result) => {
    if (err) {
      callback({ code: grpc.status.INTERNAL, message: "Invalid XML" });
      return;
    }

    console.log("Converted JSON:", JSON.stringify(result, null, 2));
  });

  // Response XML
  const responseXML = `<?xml version="1.0" encoding="UTF-8"?>
    <response>
      <status>success</status>
      <message>XML received</message>
    </response>`;

  callback(null, { responseMessage: responseXML });
}

const server = new grpc.Server();
server.addService(proto.XMLGetter.service, { returnFromXML: returnFromXML });
server.addService(proto.XMLSender.service, { addToXML: addToXML });

const PORT = "50051";
server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log(`gRPC server running at http://localhost:${PORT}`);
    server.start();
  }
);
