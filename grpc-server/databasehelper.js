//a class that handlers data saving and fethcing from xml
const fs = require("fs");
const xml2js = require("xml2js");
const path = require("path");

const xmlFilePath = "xmlTemp.xml";
const parser = new xml2js.Parser(); //{ explicitArray: false });
const builder = new xml2js.Builder({
  renderOpts: { pretty: true, indent: "  ", newline: "\n" },
  xmldec: { version: "1.0", encoding: "UTF-8" },
});
const xml = `<?xml version="1.0" encoding="UTF-8"?><data></data>`;

if (!fs.existsSync(xmlFilePath)) {
  // If the XML file doesn't exist, create it and write the XML data
  fs.writeFileSync(xmlFilePath, xml, "utf8");
  console.log("XML file created successfully!");
}

function getDataFromDB(topicName, callback) {
  console.log("Topicname:: " + topicName);
  if (!fs.existsSync(xmlFilePath)) {
    // If the XML file doesn't exist, create it and write the XML data
  }
  fs.readFile(xmlFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    parser.parseString(data, (err, existingDb) => {
      if (err) {
        console.error("Error parsing XML:", err);
        return "No data found";
      }

      let existingTopics = existingDb.data || [];
      let exists = existingTopics.topic.find(
        (topic) => topic.name[0] === topicName
      );
      callback(null, { message: JSON.stringify(exists ?? "no data found") });
    });
  });
}

function updateMockDatabase(newXml) {
  if (!fs.existsSync(xmlFilePath)) {
    // If the XML file doesn't exist, create it and write the XML data
    fs.writeFileSync(xmlFilePath, xml, "utf8");
    console.log("XML file created successfully!");
  }
  fs.readFile(xmlFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    parser.parseString(data, (err, existingDb) => {
      if (err) {
        console.error("Error parsing XML:", err);
        return;
      }

      parser.parseString(newXml, (err, newEntry) => {
        if (err) {
          console.error("Error parsing new XML:", err);
          return;
        }
        let existingTopics = existingDb.data;

        if (!existingTopics) {
          existingTopics = newEntry;
        } else {
          let newTopic = newEntry.topic;
          let newName = newTopic.name[0];

          // Find index of existing item with same name
          let exists = existingTopics.topic.find(
            (topic) => topic.name[0] === newName
          );

          if (exists) {
            exists.note.push(newEntry.topic.note[0]);
          } else {
            existingTopics.topic.push(newTopic);
          }
        }
        existingDb.data = existingTopics;
        let updatedXml = builder.buildObject(existingDb);
        fs.writeFile(xmlFilePath, updatedXml, (err) => {
          if (err) console.error("Error writing file:", err);
          else console.log("Database updated successfully!");
        });
      });
    });
  });
}

module.exports = { updateMockDatabase, getDataFromDB };
