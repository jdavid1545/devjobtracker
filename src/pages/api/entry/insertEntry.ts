import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";

export type POST: APIRoute = async ({ request }) => {
    try {
        const requestData = await request.json();

        const email: string = requestData.email;
        const entryType: string = requestData.entryType;
        const company: string = requestData.company;
        const timestamp: Date = requestData.timestamp;

        const db = getFirestore(app);

        const entryRef = await db.collection("users").doc(email).collection("entries");

        const entryData: DisplayEntry {
            type: entryType,
            company: company,
            timestamp: timestamp,
        };

        // add entry to the database with a firebase generated doc id
        entryRef.add(entryData);

    } catch (error) {
        console.log(error);
        return new Reponse("Something went wrong." , {
            status: 500,
        })
    }
}