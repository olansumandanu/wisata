import { Authenticator } from "remix-auth";
import { User } from "@prisma/client/edge";
import { GoogleStrategy, SocialsProvider } from "remix-auth-socials";

import { createUser } from "~/models/user.server";
import { sessionStorage } from "./session.server";

export const authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
  new GoogleStrategy(
    {
      clientID: process.env.REACT_APP_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET as string,
      scope: ["openid email profile"],
      callbackURL: `http://103.186.0.225:3000/auth/${SocialsProvider.GOOGLE}/callback`,
    },
    async ({ profile }) => {
      // Get the user data from your DB or API using the tokens and profile
      return createUser({ email: profile.emails[0].value, name: "" });
    }
  )
);
