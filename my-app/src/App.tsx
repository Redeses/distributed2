import { useState } from "react";
import { sendUserNotes, fetchNotes } from "./api";
import { topicType, xmlJsonType } from "./interfaces";
import "./App.css";

function App() {
  const [topic, setTopic] = useState("");
  const [noteName, setNoteName] = useState("");
  const [noteText, setNoteTExt] = useState("");
  const [topicFetchText, setTopicFetchText] = useState("");

  const [message, setMessage] = useState<topicType>({ name: "", note: [] });

  const handleSubmit = async () => {
    let notes: xmlJsonType = {
      topic: [
        {
          name: topic,
          note: [{ name: noteName, text: noteText, timeStamp: new Date("") }],
        },
      ],
    };
    const response = await sendUserNotes(notes);
    console.log(response);
  };

  const handleFetchData = async () => {
    const response: topicType = await fetchNotes(topicFetchText);
    setMessage(response);
  };

  return (
    <div>
      <>
        <h1>gRPC testing for Distributed</h1>
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enters topic name"
        />
        <input
          value={noteName}
          onChange={(e) => setNoteName(e.target.value)}
          placeholder="Enter note name"
        />
        <input
          value={noteText}
          onChange={(e) => setNoteTExt(e.target.value)}
          placeholder="Enter note"
        />
        <button onClick={handleSubmit}>send data</button>
      </>

      <>
        <h1>get data about a topic</h1>

        <input
          value={topicFetchText}
          onChange={(e) => setTopicFetchText(e.target.value)}
          placeholder="Enter topic"
        />
        <button onClick={handleFetchData}>Ask about topic</button>
        <div>FOund information about the topic</div>
        <div>
          <h2>Topic: {message.name[0]}</h2>
          <ul>
            {message.note.map((note, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "10px",
                  padding: "10px",
                  border: "1px solid #ccc",
                }}
              >
                <h3>{note.name[0]}</h3>
                <p>{note.text[0]}</p>
                <small>
                  Timestamp: {new Date(note.timeStamp).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>
        </div>
      </>
    </div>
  );
}

export default App;
