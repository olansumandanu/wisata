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
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="fixed inset-0 w-full h-full bg-[#000000] opacity-[28%]"></div>
        <div className="flex items-center min-h-screen ">
          <div className="mx-auto bg-white rounded-md shadow-lg">
            <div className="w-[500px] relative">
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
              <div className="absolute bottom-0 right-0 left-0 w-full inline-flex overflow-x-auto mb-2 gap-2 px-2">
                <ActivityHorizontalItem />
                <ActivityHorizontalItem />
                <ActivityHorizontalItem />
                <ActivityHorizontalItem />
                <ActivityHorizontalItem />
                {/* <div className="relative h-28 bg-white p-2 bg-[url('assets/images/borrobudur.svg')] rounded-lg bg-cover bg-center">
                  <div className="bg-white text-xs rounded-full inline-flex gap-1 w-fit px-2 py-0.5 items-center">
                    <svg
                      className="w-3 h-3 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>{" "}
                    4.2
                  </div>
                  <p className="text-xs text-nowrap font-light text-gray-500 w-56 ">
                    Candi Borrobudur
                  </p>
                  <button className="py-1 px-2 bg-red-500 text-white text-xs text-nowrap absolute bottom-2 rounded-lg left-2">
                    Pesan Sekarang
                  </button>
                </div>
                <div className="w-[200px] h-[50px] bg-white p-4">
                  <button className="p-1 bg-red-500 text-white text-xs text-nowrap">
                    Pesan Sekarang
                  </button>
                </div>
                <div className="w-[200px] h-[50px] bg-white p-4">
                  <button className="p-1 bg-red-500 text-white text-xs text-nowrap">
                    Pesan Sekarang
                  </button>
                </div>
                <div className="w-[200px] h-[50px] bg-white p-4">
                  <button className="p-1 bg-red-500 text-white text-xs text-nowrap">
                    Pesan Sekarang
                  </button>
                </div>
                <div className="w-[200px] h-[50px] bg-white p-4">
                  <button className="p-1 bg-red-500 text-white text-xs text-nowrap">
                    Pesan Sekarang
                  </button>
                </div>
                <div className="w-[200px] h-[50px] bg-white p-4">
                  <button className="p-1 bg-red-500 text-white text-xs text-nowrap">
                    Pesan Sekarang
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

AgodaMapModal.displayName = "AgodaMapModal";
