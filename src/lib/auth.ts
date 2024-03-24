import { AstroDBAdapter } from "lucia-adapter-astrodb";
import { db, Session, User } from "astro:db";
import { Lucia } from "lucia";
import { GitHub, Google } from "arctic";

// @ts-expect-error missmatch in types
const adapter = new AstroDBAdapter(db, Session, User);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: import.meta.env.PROD,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      name: attributes.name,
      email: attributes.email,
      avatar: attributes.avatar,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  name: string;
  email: string;
  avatar: string;
}

export const github = new GitHub(
  import.meta.env.GITHUB_CLIENT_ID,
  import.meta.env.GITHUB_CLIENT_SECRET,
);

export const google = new Google(
  import.meta.env.GOOGLE_CLIENT_ID,
  import.meta.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:4321/login/google/callback",
);
