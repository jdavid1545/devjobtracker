import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";
import type { DisplayEntry, RequestEntry } from "../../../util/types";

export const POST: APIRoute = async ({ request }) => {
  try {
    const requestData = await request.json();

    const email = requestData.email;
    const entryType = requestData.entryType;
    const company = requestData.company;
    const timestamp = requestData.timestamp;
    console.log(`Email in insertEntry is ${email}`);
    console.log(`EntryType in insertEntry is ${entryType}`);
    console.log(`Company in insertEntry is ${company}`);
    console.log(`Timestamp in insertEntry is ${timestamp}`);

    console.log(`RequestData in insertEntry is ${JSON.stringify(requestData)}`);

    const db = getFirestore(app);

    const entryRef = await db
      .collection("users")
      .doc(email)
      .collection("entries");

    const entryData: DisplayEntry = {
      type: requestData.entryType as string,
      company: requestData.company as string,
      timestamp: requestData.timestamp as Date,
    };

    // add entry to the database with a firebase generated doc id
    const docRef = await entryRef.add(entryData);

    // Retrieve the ID of the newly added document
    const entryID = docRef.id;
    console.log(`Added Entry ID: ${entryID}`);

    // Now retun a list of all the application entries
    const docs = (await entryRef.get()).docs;

    const displayEntries: DisplayEntry[] = [];

    docs.forEach((doc) => {
      const entry: DisplayEntry = doc.data() as DisplayEntry;
      displayEntries.push(entry);
    });

    return new Response(JSON.stringify(displayEntries), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
    // return new Response("Request successful!!!", {
    //   status: 200,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong.", {
      status: 500,
    });
  }
};
