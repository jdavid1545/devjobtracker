import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";
import firebase from "firebase/app";
import type { Entry, FirebaseEntry, RequestEntry } from "../../../util/types";
import { firestore } from "firebase-admin";
import Timestamp = firestore.Timestamp;

export const POST: APIRoute = async ({ request }) => {
  try {
    const requestData = (await request.json()) as RequestEntry;

    const email = requestData.email;
    // const entryType = requestData.entryType;
    // const company = requestData.company;
    // const date = requestData.date;
    // const time = requestData.time;
    console.log(`Email in insertEntry is ${email}`);
    // console.log(`EntryType in insertEntry is ${entryType}`);
    // console.log(`Company in insertEntry is ${company}`);
    // console.log(`Date in insertEntry is ${date}`);
    // console.log(`Time in insertEntry is ${time}`);

    console.log(`RequestData in insertEntry is ${JSON.stringify(requestData)}`);

    const db = getFirestore(app);

    const newEntryRef = db
      .collection("users")
      .doc(email)
      .collection("entries")
      .doc();

    const entryData: FirebaseEntry = {
      id: newEntryRef.id,
      entryType: requestData.entryType,
      company: requestData.company,
      date: requestData.date,
      time: requestData.time,
      // timestamp: Timestamp.fromDate(requestData.timestamp),
    };

    // add entry to the database with a firebase generated doc id
    await newEntryRef.set(entryData);

    // Retrieve the ID of the newly added document
    const newEntryRefID = newEntryRef.id;
    console.log(`Added Entry ID: ${newEntryRefID}`);

    // get reference to the entries collection
    const entriesRef = await db
      .collection("users")
      .doc(email)
      .collection("entries");

    // get all documents in the entries collection
    const docs = (await entriesRef.get()).docs;

    const entries: Entry[] = docs.flatMap((doc) => {
      const data = doc.data() as FirebaseEntry;
      return [
        {
          id: data.id,
          entryType: data.entryType,
          company: data.company,
          date: data.date,
          time: data.time,
        },
      ];
    });

    return new Response(JSON.stringify(entries), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong.", {
      status: 500,
    });
  }
};
