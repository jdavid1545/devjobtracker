import type { APIRoute } from "astro";
import { getAuth } from "firebase-admin/auth";
import { app } from "../../../firebase/server";

export const POST: APIRoute = async ({ request, redirect }) => {
  const auth = getAuth(app);

  /* DONE: Get form data */
  // From the form data, get the email, password and name.
  // For any missing field send 400 response.
  // Create a user using Auth service.
  // Takes in email, password, displayName
  // If successful, redirect to /signin

  /* Create user */
  try {
    const data = await request.json();
    const { email, password } = data;

    if (!email || !password) {
      return new Response("Missing form data", { status: 400 });
    }

    await auth.createUser({
      email,
      password,
    });
  } catch (error) {
    console.log(error);
    return new Response(`Something went wrong`, {
      status: 400,
    });
  }
  return redirect("/");
};
