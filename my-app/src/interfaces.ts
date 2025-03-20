interface dataNoteInterface {
  name: string;
  text: string;
  timeStamp: Date | null;
}

export interface userNotes {
  topicName: string;
  notes: dataNoteInterface[];
}

interface noteType {
  name: string;
  text: string;
  timeStamp: Date;
}

export interface topicType {
  name: string;
  note: noteType[];
}

export interface xmlJsonType {
  topic: topicType[];
}
