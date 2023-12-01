import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";
import firebase from "firebase/app";
import type { Entry, FirebaseEntry, RequestEntry } from "../../../util/types";
import { firestore } from "firebase-admin";
import Timestamp = firestore.Timestamp;

export const PUT: APIRoute = async ({ request }) => {
  try {
    // const requestData = (await request.json()) as RequestEntry;

    // parse the email and entry id from the url
    const searchParams = new URL(request.url).searchParams;
    const email = searchParams.get("email") as string;
    const entryId = searchParams.get("entryId") as string;
    console.log(`Email in deleteEntry request is: ${email}`);
    console.log(`EntryID in deleteEntry request is: ${entryId}`);

    // parse the request body
    const requestData = (await request.json()) as RequestEntry;

    const db = getFirestore(app);

    const editEntryRef = db
      .collection("users")
      .doc(email)
      .collection("entries")
      .doc(entryId);

    const entryData: FirebaseEntry = {
      id: entryId,
      entryType: requestData.entryType,
      company: requestData.company,
      date: requestData.date,
      time: requestData.time,
      // timestamp: Timestamp.fromDate(requestData.timestamp),
    };

    // add entry to the database with a firebase generated doc id
    const res = await editEntryRef.set(entryData);

    return new Response(`Entry id \"${entryId}\" successfully updated.`, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(`Entry failed to update`, {
      status: 500,
    });
  }
};
