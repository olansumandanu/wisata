import { Form, useActionData, useSubmit } from "@remix-run/react";
import logo from "~/assets/images/logo.svg";
import AppStoreBtn from "~/assets/images/app_store.svg";
import GooglePlayBtn from "~/assets/images/Google_Play_Store_badge.svg";
import MarkerIcon from "~/assets/images/streamline_ai-navigation-spark-solid.svg";
import { useEffect, useState } from "react";
import { action } from "~/routes/_index";

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

  // const [showDatePicker, setModalDatePicker] = useState<boolean>(false);
  const [citySelected, setCitySelected] = useState<string>();
  const [checkInDate] = useState<string>("2024-04-05");
  const [checkOutDate] = useState<string>("2024-04-06");
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
  // const [value, setValue] = useState({
  //   startDate: null,
  //   endDate: null,
  // });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const handleValueChange = (newValue: any) => {
  //   setValue(newValue);
  // };
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
    <>
      <section className="">
        <div className="flex flex-col items-center justify-center mt-[100px]">
          <div className="w-fit md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 flex flex-col items-center w-[420px]">
              <div className="space-y-1">
                <img src={logo} alt="logo" />
                <p className="text-white text-center text-lg w-full">
                  Buat Rencana Perjalanan Anda Lebih Cepat!
                </p>
              </div>
              <div className="relative w-full">
                <Form
                  method="post"
                  className=" w-full  bg-white hover:bg-blue-100 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm pl-5 pr-2 py-1.5 text-center flex items-center justify-between "
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
                    className="w-full text-lg font-light bg-transparent  outline-none"
                    placeholder="City"
                    value={citySelected || ""}
                    onChange={handleTextValueChange}
                    autoComplete="off"
                  />
                  <button
                    className="float-end bg-[#019DA9] p-2.5 text-white rounded-full"
                    type="submit"
                  >
                    <img src={MarkerIcon} className="w-4 h-4" alt="" />
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
              </div>
              {/* <Datepicker
              inputClassName="w-full z-1 rounded-md focus:ring-0 font-normal bg-white relative "
              value={value}
              onChange={handleValueChange}
            /> */}
              <button
                className="inline-flex gap-2 text-sm text-nowrap text-white px-4 py-2.5 text-center rounded-full items-center bg-white hover:bg-opacity-[30%] bg-opacity-[15%]"
                // onClick={() => setModalDatePicker(true)}
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                {"  "}5 Maret 2024 -{"  "}
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                    clipRule="evenodd"
                  />
                </svg>{" "}
                7 Maret 2024
              </button>
              <div className="inline-flex justify-between gap-4">
                <button>
                  <img src={AppStoreBtn} alt="logo" />
                </button>
                <button>
                  <img src={GooglePlayBtn} alt="logo" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <DatePickerModal
        show={showDatePicker}
        onActionClose={() => setModalDatePicker(false)}
      /> */}
    </>
  );
};
