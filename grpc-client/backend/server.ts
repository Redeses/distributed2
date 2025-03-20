var express = require("express");
var cors = require("cors");
import { getXrpc, sendXrpc } from "./grpc-helper";
import { parseIntoXMLFunction } from "./xml-helper";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/sendXML", async (req: any, res: any) => {
  try {
    const information = req.body;
    if (!information) {
      return res.status(400).json({ error: "Information is required" });
    }
    information.topic[0].note[0].timeStamp = new Date().toISOString();
    const xmlSent = parseIntoXMLFunction(information);
    const response = await sendXrpc(xmlSent);
    if (response) {
      res.json({ message: "success" });
    } else {
      res.json({ message: "Failure" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/getXML", async (req: any, res: any) => {
  try {
    if (!req.query.topicName) {
      return res.status(400).json({ error: "Names is required" });
    }
    const noteData = await getXrpc(req.query.topicName as string);
    console.log(noteData);
    res.json({ message: noteData });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Express server running on port ${PORT}`));
