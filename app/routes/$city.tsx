import { json, LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { Form, useLoaderData } from "@remix-run/react";
import OpenAI from "openai";

import logoBlack from "~/assets/images/logo_black.svg";
import MarkerIcon from "~/assets/images/marker.svg";
import WeatherIcon from "~/assets/images/material-symbols_weather-mix.svg";
import WalletIcon from "~/assets/images/mingcute_wallet-fill.svg";
import LanguageIcon from "~/assets/images/ion_language.svg";
import GoogleIcon from "~/assets/images/devicon_google.svg";
import { citySearch } from "~/actions/agoda.action";
import { OpsiPlanModal } from "~/components/modals/OpsiPlanModal";
import { AgodaMapModal } from "~/components/modals/AgodaMapModal";
import { HotelList } from "~/components/lists/HotelList";
import { ActivityList } from "~/components/lists/ActivityList";
import { Button, FlyButton, Ratting } from "~/components";
import { countDays, stringDateFormat } from "~/utils/Date";
import {
  EmailDesktop,
  EmailMobile,
  InstagramDesktop,
  InstagramMobile,
  LogoDesktopSmall,
  LogoMobileSmall,
} from "~/assets/images";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);
  const cityId = searchParams.get("cityId");
  const checkInDate = searchParams.get("checkInDate");
  const checkOutDate = searchParams.get("checkOutDate");
  const sumOfDay = countDays(checkInDate as string, checkOutDate as string);

  const openai = new OpenAI();
  const descripsi = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: "deskripsi singkat tentang " + params.city,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  const history = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: "sejarah singkat tentang " + params.city,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  const information = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: "lokasi , budaya, bahasa, cuaca, biaya di " + params.city,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  const location = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: "lokasi " + params.city,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  const weather = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: "keterangan singkat cuaca di " + params.city,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  const livingCost = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content:
          "keterangan singkat dua baris mata uang dan biaya hidup di " +
          params.city,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  const language = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: "keterangan singkat dua baris bahasa di " + params.city,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  const travels = await openai.chat.completions.create({
    messages: [
      // { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: `${sumOfDay} hari wisata di ${
          params.city
        } tanggal ${stringDateFormat(
          checkInDate as string
        )} hingga ${stringDateFormat(checkOutDate as string)} `,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  const data = {
    criteria: {
      additional: {
        currency: "USD",
        dailyRate: {
          maximum: 10000,
          minimum: 1,
        },
        discountOnly: false,
        language: "en-us",
        maxResult: 10,
        minimumReviewScore: 0,
        minimumStarRating: 0,
        occupancy: {
          numberOfAdult: 2,
          numberOfChildren: 1,
        },
        sortBy: "PriceAsc",
      },
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      cityId: Number(cityId),
    },
  };
  const res = await citySearch(data);
  const klooks = fetch(
    `https://www.klook.com/v1/cardinfocenterservicesrv/search/platform/complete_search?sort=most_relevant&query=${params.city}&page_num=1&page_size=10&is_only_total=false`
  )
    .then((response) => response.json())
    .then((data) => {
      return data.result.search_result.cards;
    })
    .catch(() => {
      return [];
    });
  return json({
    city: params.city,
    days: sumOfDay,
    checkInDate,
    checkOutDate,
    hotels: res.data.results,
    descripsi: descripsi.choices[0].message.content,
    history: history.choices[0].message.content,
    location: location.choices[0].message.content,
    weather: weather.choices[0].message.content,
    livingCost: livingCost.choices[0].message.content,
    language: language.choices[0].message.content,
    about: information.choices[0].message.content,
    travels: travels.choices[0].message.content,
    klooks: await klooks,
  });
};

export default function Index() {
  const {
    city,
    days,
    checkInDate,
    checkOutDate,
  }: {
    city: string;
    days: string;
    checkInDate: string;
    checkOutDate: string;
  } = useLoaderData();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalAgodaMapOpen, setModalAgodaMapOpen] = useState(false);

  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />
      <Section />
      <Footer />
      <OpsiPlanModal
        title={`${days} Hari Menelusuri Budaya di ${city}`}
        subtitle={`${stringDateFormat(
          checkInDate as string
        )} - ${stringDateFormat(checkOutDate as string)}`}
        show={modalOpen}
        onActionClose={() => setModalOpen(false)}
        onActionShowMap={() => setModalAgodaMapOpen(true)}
      />
      <AgodaMapModal
        show={modalAgodaMapOpen}
        onActionClose={() => setModalAgodaMapOpen(false)}
      />
      <FlyButton onAction={() => setModalOpen(true)} />
    </div>
  );
}

export const Header = () => {
  const {
    city,
    days,
    checkInDate,
    checkOutDate,
  }: {
    city: string;
    days: string;
    checkInDate: string;
    checkOutDate: string;
  } = useLoaderData();

  return (
    <header className="w-screen bg-city-mobile md:bg-city-desktop py-4 md:py-6 px-2 md:px-10 bg-cover">
      <div className="fixed inset-0 bg-[#024F55] opacity-[46%]"></div>
      <div className="relative flex justify-between items-center">
        <img src={LogoMobileSmall} alt="logo" className="pl-2 md:hidden" />
        <img src={LogoDesktopSmall} alt="logo" className="hidden md:block" />
        <div className="inline-flex gap-1 float-end">
          <button
            type="button"
            className="text-center inline-flex items-center me-2 "
          >
            <img src={InstagramMobile} alt="logo" className="md:hidden" />
            <img
              src={InstagramDesktop}
              alt="logo"
              className="hidden md:block"
            />
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
      </div>
      <div className="relative space-y-1 pt-4">
        <h1 className="text-4xl text-center text-white">
          {days} Hari Menelusuri Budaya di {city}
        </h1>
        <p className="text-xs text-center text-white font-light">
          {`${stringDateFormat(checkInDate)} - ${stringDateFormat(
            checkOutDate
          )}`}
        </p>
        <p className="text-xs text-center text-white font-light">
          Orang lain menilai rencana ini
        </p>
        <Ratting color="light" />
      </div>
    </header>
  );
};

export const Section = () => {
  const [isAbout, setIsAbout] = useState(true);
  const {
    hotels,
    city,
    descripsi,
    language,
    livingCost,
    location,
    history,
    travels,
    weather,
    klooks,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    hotels: any[];
    city: string;
    descripsi: string;
    language: string;
    livingCost: string;
    location: string;
    history: string;
    travels: string;
    weather: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    klooks: any[];
  } = useLoaderData();

  return (
    <section className="relative flex-1 bg-[#F8F8F8] w-screen min:h-full flex p-2 md:py-5 md:justify-center">
      <div className="w-full md:w-2/4 space-y-3">
        <div className="rounded-lg bg-white p-2 md:py-4 md:px-8 space-y-2">
          <ul className="inline-flex gap-2">
            <li>
              <button
                type="button"
                onClick={() => setIsAbout(true)}
                className="active px-3 py-1 text-sm font-medium text-center inline-flex items-center hover:text-white active:text-white border rounded-full border-[#019DA9]  hover:bg-[#019DA9] active:bg-[#019DA9] active:outline-none gap-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                  />
                </svg>
                Tentang
              </button>
            </li>
            <li className="me-2">
              <button
                type="button"
                onClick={() => setIsAbout(false)}
                className="px-3 py-1 text-sm font-medium text-center inline-flex items-center hover:text-white focus:text-white border rounded-full border-[#019DA9]  hover:bg-[#019DA9] focus:bg-[#019DA9] focus:outline-none gap-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>
                Informasi Umum
              </button>
            </li>
          </ul>

          <h1 className="font-bold text-2xl py-2">{city}</h1>

          {isAbout ? (
            <dl className="space-y-4">
              <div className="flex flex-col gap-1">
                <dt className="text-sm font-semibold inline-flex gap-1 items-center">
                  Deskripsi
                </dt>
                <dd className="text-xs font-light">{descripsi}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-sm font-semibold inline-flex gap-1 items-center">
                  Sejarah
                </dt>
                <dd className="text-xs font-light">{history}</dd>
              </div>
            </dl>
          ) : (
            <dl className="space-y-4">
              <div className="flex flex-col gap-1">
                <dt className="text-sm font-semibold inline-flex gap-1 items-center">
                  <img src={MarkerIcon} alt="" />
                  Tentang Lokasi
                </dt>
                <dd className="text-xs font-light">{location}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-sm font-semibold inline-flex gap-1 items-center">
                  <img src={WeatherIcon} alt="" />
                  Cuacanya
                </dt>
                <dd className="text-xs font-light">{weather}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-sm font-semibold inline-flex gap-1 items-center">
                  <img src={WalletIcon} alt="" />
                  Mata uang & Biaya
                </dt>
                <dd className="text-xs font-light">{livingCost}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-sm font-semibold inline-flex gap-1 items-center">
                  <img src={LanguageIcon} alt="" />
                  Bahasa
                </dt>
                <dd className="text-xs font-light">{language}</dd>
              </div>
            </dl>
          )}
        </div>
        <div className="rounded-lg bg-white p-2 md:py-4 md:px-8 space-y-2">
          <h1 className="font-bold text-sm py-2">Rencana Perjalanan</h1>
          {travels.split("Hari").map(
            (days: string, index: number) =>
              index > 0 && (
                <ul
                  key={index}
                  className="space-y-4 list-none list-inside text-sm font-light"
                >
                  <li>
                    <h1 className="text-xl text-[#019DA9]">Hari {index}</h1>
                    {/* <div className="font-bold text-[#019DA9]">
                        Candi dan Warisan Budaya
                      </div>  */}
                    <p className="text-xs font-bold">
                      {days
                        .split(":")[0]
                        .split("(")[1]
                        ?.replace(")", "")
                        .trim()}
                    </p>
                  </li>
                  {days
                    .split("- ")
                    .map(
                      (list: string, idx: number) =>
                        idx > 0 && (
                          <li key={idx}>{list.trim().split(".")[0]}.</li>
                        )
                    )}
                  <li>
                    <HotelList hotels={hotels} />
                  </li>
                  <li>
                    <ActivityList klooks={klooks} />
                    {index === 1 && (
                      <div className="inline-flex gap-0.5 mt-2">
                        <Button>Buat ulang</Button>
                        <Button>
                          <svg
                            className="w-4 h-4 "
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 12h14m-7 7V5"
                            />
                          </svg>
                          Tambah Hari
                        </Button>
                        <Button>
                          <svg
                            className="w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                            />
                          </svg>
                          Edit
                        </Button>
                      </div>
                    )}
                  </li>
                </ul>
              )
          )}
        </div>
      </div>
    </section>
  );
};

export const Footer = () => (
  <footer className="relative bg-white ">
    <div className="flex md:flex-row flex-col px-4  gap-4 mt-4">
      <div className="space-y-2 py-4 md:px-10 flex-1">
        <img src={logoBlack} alt="Logo" />
        <p className="text-xs text-gray-500 text-center justify-center md:text-start md:w-[400px]">
          Aplikasi kami menggunakan kecerdasan buatan untuk menyusun itinerary
          yang sesuai dengan keinginan Anda. Hemat waktu, nikmati perjalanan
          tanpa repot!
        </p>
      </div>
      <div className="space-y-2 md:w-[300px] text-center md:text-start">
        <h2 className="text-xs font-medium text-gray-900">Mulai Dulu</h2>
        <ul className="text-sm font-semibold space-y-1">
          <li>Rencana perjalanan ke Jogja</li>
          <li>Rencana perjalanan ke Bandung</li>
          <li>Rencana perjalanan ke Jogja</li>
          <li>Rencana perjalanan ke Bandung</li>
          <li>Rencana perjalanan ke Jogja</li>
          <li>Rencana perjalanan ke Bandung</li>
        </ul>
      </div>
      <div className="space-y-2 md:w-[300px] text-center md:text-start">
        <h2 className="text-xs font-medium text-gray-900">Perusahaan</h2>
        <ul className="text-sm font-semibold space-y-1">
          <li>Partnership</li>
          <li>Carreer</li>
          <li>Terms</li>
          <li>Privacy</li>
          <li>Instagram</li>
          <li>Blog</li>
        </ul>
      </div>
    </div>
    <div className="flex bg-[#F9FAFB] mt-8 py-4">
      <span className="text-sm text-gray-500 text-center w-full">
        © 2024{" "}
        <a href="https://flowbite.com/" className="hover:underline">
          Rekreasi™
        </a>
        . All Rights Reserved.
      </span>
    </div>
  </footer>
);
