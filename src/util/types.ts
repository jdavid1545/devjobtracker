export type Entry = {
  // entryID: string;
  entryType: EntryType;
  company: string;
  date: string;
  time: string;
};

export type FirebaseEntry = {
  // entryID: string;
  entryType: EntryType;
  company: string;
  date: string;
  time: string;
};

export type RequestEntry = FirebaseEntry & {
  email: string;
};

export type emailProp = {
  email: string;
};

export type EntryType = "Application" | "Online Assessment" | "Interview";

// Prototypes
// export type EntryType = "Application" | "Online Assessment" | "Interview";

// export type Status = "Applied" | "Screen" | "Interview" | "Offer" | "Rejected" | "Accepted";
