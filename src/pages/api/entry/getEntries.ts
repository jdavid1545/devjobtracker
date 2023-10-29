import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";
import { DisplayEntry } from "../../../util/types";

export const GET: APIRoute = async ({ request }) => {
  try {
    // parse the email
    const searchParams = new URL(request.url).searchParams;
    const email = searchParams.get("email") as string;
    console.log(`Email in getChat request is: ${email}`);

    const db = getFirestore(app);

    const entryRefs = await db
      .collection("users")
      .doc(email)
      .collection("entries");

    const docs = (await entryRefs.get()).docs;
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
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong.", {
      status: 500,
    });
  }
};
