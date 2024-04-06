import InstagramIcon from "~/assets/images/mdi_instagram.svg";
import EmailIcon from "~/assets/images/ic_outline-email.svg";
import GoogleIcon from "~/assets/images/devicon_google.svg";
import { Form } from "@remix-run/react";

export const Header = () => (
  <header className="flex justify-end py-5 px-20">
    <div className="inline-flex gap-2">
      <button
        type="button"
        className="text-center inline-flex items-center me-2 "
      >
        <img src={InstagramIcon} alt="logo" />
        <span className="sr-only">Icon description</span>
      </button>
      <button
        type="button"
        className="text-center inline-flex items-center me-2 "
      >
        <img src={EmailIcon} alt="logo" />
        <span className="sr-only">Icon description</span>
      </button>
      <Form action="/auth" method="post">
        <button
          type="submit"
          className="bg-white focus:ring-4 focus:outline-none gap-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 "
        >
          <img src={GoogleIcon} alt="logo" />
          Login dengan Google
        </button>
      </Form>
    </div>
  </header>
);
