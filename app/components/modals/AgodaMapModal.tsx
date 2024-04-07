import { ActivityHorizontalItem } from "../lists/ActivityHorizontalItem";
import { Map } from "../map";

export const AgodaMapModal = ({
  show,
  onActionClose,
}: {
  show: boolean;
  onActionClose: () => void;
}) => {
  return (
    show && (
      <div
        id="default-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-screen md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="fixed inset-0 w-screen h-screen bg-[#000000] opacity-[28%]"></div>
        <div className="flex items-center min-h-screen ">
          <div className="md:mx-auto bg-white rounded-md shadow-lg">
            <div className="w-screen md:w-[500px] relative">
              <button
                className="font-extrabold absolute z-50 right-4 top-2 "
                onClick={onActionClose}
              >
                <svg
                  className="w-8 h-8 text-gray-600 hover:text-black"
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
                    d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
              <Map />
              <div className="absolute bottom-0 right-0 left-0 inline-flex overflow-x-auto mb-2 gap-2 px-2">
                <ActivityHorizontalItem />
                <ActivityHorizontalItem />
                <ActivityHorizontalItem />
                <ActivityHorizontalItem />
                <ActivityHorizontalItem />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

AgodaMapModal.displayName = "AgodaMapModal";
