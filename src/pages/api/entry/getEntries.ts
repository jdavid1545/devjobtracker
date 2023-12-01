import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";
import type { Entry, FirebaseEntry } from "../../../util/types";

export const GET: APIRoute = async ({ request }) => {
  try {
    // parse the email
    const searchParams = new URL(request.url).searchParams;
    const email = searchParams.get("email") as string;
    console.log(`Email in getChat request is: ${email}`);

    const db = getFirestore(app);

    const entryRef = await db
      .collection("users")
      .doc(email)
      .collection("entries");

    // Now return a list of all the application entries
    const docs = (await entryRef.get()).docs;

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
    console.error(error);
    return new Response("Something went wrong.", {
      status: 500,
    });
  }
};
