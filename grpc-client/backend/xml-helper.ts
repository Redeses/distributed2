import * as xml2js from "xml2js";

const builder = new xml2js.Builder();

export function parseIntoXMLFunction(information: any) {
  //used to parse json info into xml
  const builder = new xml2js.Builder();
  // Convert JSON to XML
  const xml = builder.buildObject(information);
  return xml;
}

export function parseIntoJsonFunction(information: any) {
  //used to parse json info into xml
  const parser = new xml2js.Parser();
  // Convert XML to JSON
  parser.parseString(information, (err, json) => {
    if (err) {
      console.error("Error parsing XML:", err);
      return "failed getting data";
    }
    return json;
  });
}
