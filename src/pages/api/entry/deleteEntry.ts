import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";
// import type { Chat, Message } from "../../../React-484/src/utils/types";

export const DELETE: APIRoute = async ({ request }) => {
  try {
    // TODO: delete entry specified by index or id
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong.", {
      status: 500,
    });
  }
};
