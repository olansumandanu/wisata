import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { SocialsProvider } from "remix-auth-socials";
import { authenticator } from "~/services/auth.server";

export const loader = () => redirect("/");

export const action = async ({ request }: ActionFunctionArgs) => {
  return await authenticator.authenticate(SocialsProvider.GOOGLE, request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });
};
