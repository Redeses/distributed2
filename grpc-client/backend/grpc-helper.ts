import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.resolve(__dirname, "service.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const grpcObject = grpc.loadPackageDefinition(packageDefinition) as any;
const myService = grpcObject.myservice as any;

if (!myService || !myService.XMLGetter || !myService.XMLSender) {
  console.error("Error: Greeter service not found in loaded proto definition");
  console.log("Loaded Proto:", myService);
  process.exit(1);
}

const client = new myService.XMLSender(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const client2 = new myService.XMLGetter(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

/**
 * Calls the SayHello RPC method.
 * @param {string} name - The name to send to the server.
 * @returns {Promise<string>} - A promise resolving to the response message.
 */
export function getXrpc(name: string): Promise<string> {
  return new Promise((resolve, reject) => {
    client2.returnFromXML({ name }, (error: any, response: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(response.message);
      }
    });
  });
}
/**
 * Calls the addToXML RPC method.
 * @param {string} name - The name to send to the server.
 * @returns {Promise<string>} - A promise resolving to the response message.
 */
export function sendXrpc(name: string): Promise<string> {
  return new Promise((resolve, reject) => {
    client.addToXML({ name }, (error: any, response: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(response.message);
      }
    });
  });
}
