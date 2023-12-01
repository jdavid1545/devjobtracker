export type Entry = {
  id: string;
  entryType: EntryType;
  company: string;
  date: string;
  time: string;
};

export type FirebaseEntry = {
  id: string;
  entryType: EntryType;
  company: string;
  date: string;
  time: string;
  // timestamp: Date;
};

export type RequestEntry = FirebaseEntry & {
  email: string;
};

export type emailProp = {
  email: string;
};

export type EntryType = "Application" | "Online Assessment" | "Interview";

// Prototypes
// export type Status = "Applied" | "Screen" | "Interview" | "Offer" | "Rejected" | "Accepted";
