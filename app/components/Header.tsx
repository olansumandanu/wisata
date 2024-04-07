import InstagramIcon from "~/assets/images/mdi_instagram.svg";
import EmailIcon from "~/assets/images/ic_outline-email.svg";
import GoogleIcon from "~/assets/images/devicon_google.svg";
import { Form } from "@remix-run/react";

export const Header = () => (
  <header className="relative flex justify-end py-4 px-2 md:px-10">
    <div className="inline-flex gap-1">
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
          className="bg-white focus:ring-4 focus:outline-none gap-2 font-xs md:font-sm rounded-lg text-sm p-2 text-center inline-flex items-center me-2 "
        >
          <img src={GoogleIcon} alt="logo" />
          <div className="hidden md:block">Login dengan Google</div>
          <div className="md:hidden">Login</div>
        </button>
      </Form>
    </div>
  </header>
);
