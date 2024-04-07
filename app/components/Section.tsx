import { Form, useActionData, useSubmit } from "@remix-run/react";

import { useEffect, useState } from "react";
import { action } from "~/routes/_index";
import { dateFormatter, stringDateFormat } from "~/utils/Date";
import { DatePickerModal } from "./modals/DatePickerModal";

import { Calendar, Marker } from "~/assets/Icons";
import { AppsGoogle, AppsIos, LogoDesktop, LogoMobile } from "~/assets/images";

export const Section = () => {
  const actions:
    | {
        citys: {
          name: string;
          id: number;
          cityId: number;
          country: string;
          city: string;
          typeName: string;
        }[];
      }
    | undefined = useActionData<typeof action>();
  const submit = useSubmit();

  const date = new Date();

  // add a day
  const now = date.setDate(date.getDate() + 1);
  const next = date.setDate(date.getDate() + 2);

  const [showDatePicker, setModalDatePicker] = useState<boolean>(false);
  const [citySelected, setCitySelected] = useState<string>();
  const [checkInDate, setCheckInDate] = useState<string>(
    dateFormatter.format(now)
  );
  const [checkOutDate, setCheckOutDate] = useState<string>(
    dateFormatter.format(next)
  );
  const [cityId, setCityId] = useState<number>();
  const [citys, setCitys] = useState(
    actions?.citys?.filter(
      (city: { typeName: string }) =>
        city.typeName === "City" || city.typeName === "Neighborhood"
    ) || []
  );

  useEffect(() => {
    setCitys(
      actions?.citys?.filter(
        (city: { typeName: string }) =>
          city.typeName === "City" || city.typeName === "Neighborhood"
      ) || []
    );
  }, [actions?.citys, citySelected]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleTextValueChange = (e: any) => {
    setCitySelected(e.target.value);
    submit({ keywords: e.target.value }, { method: "put" });
  };

  const handleCitySelected = (city: { name: string; cityId: number }) => {
    setCitys([]);
    setCitySelected(city.name);
    setCityId(city.cityId);
  };

  return (
    <section className="relative flex-1 flex items-center justify-center">
      <div className="flex flex-col">
        <img src={LogoMobile} alt="logo" className="md:hidden mx-auto" />
        <img src={LogoDesktop} alt="logo" className="hidden md:block mx-auto" />
        <p className="text-white text-center text-xl font-light md:text-nowrap w-[300px] md:w-auto mx-auto">
          Buat Rencana Perjalanan Anda Lebih{" "}
          <b className="font-extrabold">Cepat!</b>
        </p>
        <Form
          method="post"
          className="w-full bg-white hover:bg-blue-100 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm pl-5 pr-1.5 py-1 mt-5 mb-2 text-center flex items-center justify-between mx-auto"
        >
          <input
            name="cityId"
            value={cityId || ""}
            type="hidden"
            onChange={() => console.log("")}
          />
          <input
            name="checkInDate"
            value={checkInDate || ""}
            type="hidden"
            onChange={() => console.log("")}
          />
          <input
            name="checkOutDate"
            value={checkOutDate || ""}
            type="hidden"
            onChange={() => console.log("")}
          />
          <input
            type="text"
            name="keywords"
            className="w-full text-sm font-light bg-transparent  outline-none"
            placeholder="City"
            value={citySelected || ""}
            onChange={handleTextValueChange}
            autoComplete="off"
          />
          <button
            className="float-end bg-[#019DA9] p-2.5 text-white rounded-full"
            type="submit"
          >
            <Marker />
          </button>
        </Form>
        {citys.length > 0 && (
          <ul
            className="bg-white relative z-100 w-full space-y-2 mt-1"
            onMouseLeave={() => setCitys([])}
          >
            {citys?.map(
              (
                city: {
                  name: string;
                  id: number;
                  cityId: number;
                  country: string;
                  city: string;
                  typeName: string;
                },
                index: number
              ) =>
                index < 5 && (
                  <li key={city.id}>
                    <button
                      onClick={() => handleCitySelected(city)}
                      className="hover:bg-gray-200 px-3 py-1 w-full text-left"
                    >
                      <p className="text-sm font-bold">{city.name}</p>
                      <p className="text-xs text-gray-400 font-light">
                        {city.typeName}: {city.city}, {city.country}
                      </p>
                    </button>
                  </li>
                )
            )}
          </ul>
        )}
        <button
          className="w-fit inline-flex gap-2 text-sm text-nowrap text-white px-4 py-2 mb-4 mt-1 text-center rounded-full items-center bg-white hover:bg-opacity-[30%] bg-opacity-[15%] mx-auto"
          onClick={() => setModalDatePicker(true)}
        >
          <Calendar />
          {"  " + stringDateFormat(checkInDate) + " - "}
          <Calendar />
          {"  " + stringDateFormat(checkOutDate)}
        </button>
        <div className="inline-flex justify-between gap-2 w-fit mx-auto">
          <button>
            <img src={AppsIos} alt="logo" />
          </button>
          <button>
            <img src={AppsGoogle} alt="logo" />
          </button>
        </div>
      </div>
      <DatePickerModal
        show={showDatePicker}
        onActionClose={() => setModalDatePicker(false)}
        checkInDate={checkInDate}
        setCheckInDate={setCheckInDate}
        checkOutDate={checkOutDate}
        setCheckOutDate={setCheckOutDate}
      />
    </section>
  );
};
