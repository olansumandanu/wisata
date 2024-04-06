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
                className="font-extrabold absolute z-50 right-2"
                onClick={onActionClose}
              >
                x
              </button>
              <Map />
              <div className="absolute bottom-0 right-0 left-0 w-full inline-flex overflow-x-auto mb-2 gap-2 px-2">
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
                </div>
                <div className="w-[200px] h-[50px] bg-white p-4">
                  <button className="p-1 bg-red-500 text-white text-xs text-nowrap">
                    Pesan Sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

AgodaMapModal.displayName = "AgodaMapModal";
