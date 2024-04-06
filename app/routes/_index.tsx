import type { MetaFunction } from "@remix-run/node";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import { Section } from "~/components/Section";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="h-screen bg-[url('assets/images/background.svg')] bg-cover">
      <div className="fixed inset-0 w-full h-full bg-[#024F55] opacity-[46%]"></div>
      <div className="relative w-full h-full">
        <Header />
        <Section />
        <Footer />
      </div>
    </div>
  );
}
