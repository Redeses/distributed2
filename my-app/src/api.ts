import { userNotes, xmlJsonType } from "./interfaces";

export async function sendUserNotes(clientData: xmlJsonType) {
  const url = `http://localhost:3001/api/sendXML`;
  console.log(clientData);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clientData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data.message;
    })
    .catch((error) => console.error("Error:", error));
  return response;
}

export async function fetchNotes(topic: string) {
  const url = `http://localhost:3001/api/getXML?topicName=${encodeURIComponent(
    topic
  )}`;
  const response = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return JSON.parse(data.message);
    })
    .catch((error) => console.error("Error:", error));

  return response;
}
