import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";
// import type { Chat, Message } from "../../../React-484/src/utils/types";

export const GET: APIRoute = async ({ request }) => {
  try {
    // parse the email
    const searchParams = new URL(request.url).searchParams;
    const email = searchParams.get("email") as string;
    console.log(`Email in getChat request is: ${email}`);
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
};
