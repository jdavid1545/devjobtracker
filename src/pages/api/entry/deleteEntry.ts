import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";

export const DELETE: APIRoute = async ({ request }) => {
  try {
    // TODO: delete entry specified by index or id

    // parse the entry id
    const searchParams = new URL(request.url).searchParams;
    const email = searchParams.get("email") as string;
    const entryId = searchParams.get("entryId") as string;
    console.log(`Email in deleteEntry request is: ${email}`);
    console.log(`EntryID in deleteEntry request is: ${entryId}`);

    const db = getFirestore(app);

    const res = await db
      .collection("users")
      .doc(email)
      .collection("entries")
      .doc(entryId)
      .delete();

    return new Response("Entry successfully deleted.", {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong.", {
      status: 500,
    });
  }
};
