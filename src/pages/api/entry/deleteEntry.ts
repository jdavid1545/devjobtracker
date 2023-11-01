import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";

export const DELETE: APIRoute = async ({ request }) => {
  try {
    // TODO: delete entry specified by index or id

    return new Response("Entry deleted successfully.", {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong.", {
      status: 500,
    });
  }
};
