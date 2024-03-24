import { google, lucia } from "@/lib/auth";
import { OAuth2RequestError } from "arctic";
import { User, db, eq } from "astro:db";

import type { APIContext } from "astro";

export async function GET(context: APIContext): Promise<Response> {
  const code = context.url.searchParams.get("code");
  const state = context.url.searchParams.get("state");
  const storedState = context.cookies.get("google_oauth_state")?.value ?? null;
  const storedCodeVerifier =
    context.cookies.get("google_oauth_code_verifier")?.value ?? null;
  if (
    !code ||
    !state ||
    !storedState ||
    !storedCodeVerifier ||
    state !== storedState
  ) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(
      code,
      storedCodeVerifier,
    );
    const googleUserResponse = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    );
    const googleUser: GoogleUser = await googleUserResponse.json();
    // console.log(googleUser);
    const { name, picture: avatar, email } = googleUser;

    const existingUser = await db
      .select()
      .from(User)
      .where(eq(User.email, email))
      .get();

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id.toString(), {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      context.cookies.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
      return context.redirect("/private");
    }

    const createdUser = await db
      .insert(User)
      .values({
        name,
        email,
        avatar,
      })
      .returning()
      .get();

    const session = await lucia.createSession(createdUser.id.toString(), {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return context.redirect("/private");
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    console.error(e);
    return new Response(null, {
      status: 500,
    });
  }
}

interface GoogleUser {
  sub: string;
  name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locality: string;
}
