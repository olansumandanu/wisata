import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { dateFormatter, stringDateFormat } from "~/utils/Date";

export const DatePickerModal = ({
  show,
  onActionClose,
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
}: {
  show: boolean;
  checkInDate: string;
  setCheckInDate: (checkIn: string) => void;
  checkOutDate: string;
  setCheckOutDate: (checkOut: string) => void;
  onActionClose: () => void;
}) => {
  console.log("checkOutDate", checkOutDate);
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(checkInDate)
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date(checkOutDate));

  const handleDateChange = (dates: [Date, Date]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleSubmit = () => {
    setCheckInDate(dateFormatter.format(startDate!));
    setCheckOutDate(dateFormatter.format(endDate!));
    onActionClose();
  };

  return (
    show && (
      <div
        id="default-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="fixed inset-0 w-full h-full bg-[#000000] opacity-[28%]"></div>
        <div className="relative flex items-center min-h-screen px-4 py-8">
          <div className="relative p-4 mx-auto bg-white rounded-md shadow-lg">
            <div className="py-2">
              <ReactDatePicker
                wrapperClassName="input-attribute"
                className="bg-white appearance-none px-4 py-4 rounded-lg shadow border-none text-black"
                showIcon
                withPortal
                minDate={new Date()}
                minTime={new Date()}
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                renderCustomHeader={({
                  monthDate,
                  customHeaderCount,
                  decreaseMonth,
                  increaseMonth,
                }) => (
                  <div>
                    <button
                      aria-label="Previous Month"
                      className={
                        "react-datepicker__navigation react-datepicker__navigation--previous"
                      }
                      style={
                        customHeaderCount === 1
                          ? { visibility: "hidden" }
                          : undefined
                      }
                      onClick={decreaseMonth}
                    >
                      <span
                        className={
                          "react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
                        }
                      >
                        {"<"}
                      </span>
                    </button>
                    <span className="react-datepicker__current-month">
                      {monthDate.toLocaleString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <button
                      aria-label="Next Month"
                      className={
                        "react-datepicker__navigation react-datepicker__navigation--next"
                      }
                      style={
                        customHeaderCount === 0
                          ? { visibility: "hidden" }
                          : undefined
                      }
                      onClick={increaseMonth}
                    >
                      <span
                        className={
                          "react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
                        }
                      >
                        {">"}
                      </span>
                    </button>
                  </div>
                )}
                selectsRange
                inline
                locale="enGB" // Set locale
                monthsShown={2}
              />
            </div>
            <div className="flex justify-between items-center py-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <div className="inline-flex gap-2 items-center">
                <p className="px-2 py-2 border rounded-lg border-gray-500 text-sm font-light  items-center">
                  {stringDateFormat(
                    dateFormatter.format(startDate || new Date())
                  )}
                </p>
                <p className="py-2 text-sm font-light items-center">-</p>
                <p className="px-2 py-2 border rounded-lg border-gray-500 text-sm font-light  items-center">
                  {stringDateFormat(
                    dateFormatter.format(endDate || new Date())
                  )}
                </p>
              </div>
              <div className="float-end inline-flex gap-2">
                <button
                  data-modal-hide="default-modal"
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-[#019DA9] focus:z-10 focus:ring-4 focus:ring-gray-100 "
                  onClick={onActionClose}
                >
                  Batal
                </button>
                <button
                  data-modal-hide="default-modal"
                  type="button"
                  className="text-white bg-[#019DA9] focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={handleSubmit}
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

DatePickerModal.displayName = "DatePickerModal";
