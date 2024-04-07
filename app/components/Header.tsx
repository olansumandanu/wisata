import GoogleIcon from "~/assets/images/devicon_google.svg";
import { Form } from "@remix-run/react";

import {
  EmailDesktop,
  EmailMobile,
  InstagramDesktop,
  InstagramMobile,
} from "~/assets/images";

export const Header = () => (
  <header className="relative flex justify-end py-4 px-2 md:px-10">
    <div className="inline-flex gap-1">
      <button
        type="button"
        className="text-center inline-flex items-center me-2 "
      >
        <img src={InstagramMobile} alt="logo" className="md:hidden" />
        <img src={InstagramDesktop} alt="logo" className="hidden md:block" />
        <span className="sr-only">Icon description</span>
      </button>
      <button
        type="button"
        className="text-center inline-flex items-center me-2 "
      >
        <img src={EmailMobile} alt="logo" className="md:hidden" />
        <img src={EmailDesktop} alt="logo" className="hidden md:block" />
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
