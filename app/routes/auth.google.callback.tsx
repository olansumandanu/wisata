import { LoaderFunctionArgs } from "@remix-run/node";
import { SocialsProvider } from "remix-auth-socials";

import { authenticator } from "~/services/auth.server";

export const loader = ({ request }: LoaderFunctionArgs) => {
  return authenticator.authenticate(SocialsProvider.GOOGLE, request, {
    successRedirect: "/",
    failureRedirect: "/auth",
  });
};
