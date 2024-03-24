import { generateCodeVerifier, generateState } from "arctic";
import type { APIContext } from "astro";
import { google } from "@/lib/auth";

export async function GET(context: APIContext): Promise<Response> {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = await google.createAuthorizationURL(state, codeVerifier, {
    scopes: ["profile", "email"],
  });

  Object.entries({
    google_oauth_state: state,
    google_oauth_code_verifier: codeVerifier,
  }).forEach(([key, value]) => {
    context.cookies.set(key, value, {
      path: "/",
      secure: import.meta.env.PROD,
      httpOnly: true,
      maxAge: 60 * 10,
      sameSite: "lax",
    });
  });

  return context.redirect(url.toString());
}
