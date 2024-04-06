import { Key } from "react";

import { HotelItem } from "./HotelItem";
import AgodaIcon from "~/assets/images/agoda_mainlogo_stack_positive_ai_Main Logo 1.svg";

export const HotelList = ({
  hotels,
}: {
  hotels: {
    starRating: string;
    imageURL: string;
    hotelId: Key | null | undefined;
    hotelName: string;
    landingURL: string;
  }[];
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between py-2">
        <p className="text-sm font-medium">Pilihan Hotel untuk menginap</p>
        <img src={AgodaIcon} alt="" />
      </div>
      <div className="relative overflow-x-auto">
        <div className="inline-flex gap-3">
          {hotels.map(
            (hotel: {
              starRating: string;
              imageURL: string;
              hotelId: Key | null | undefined;
              hotelName: string;
              landingURL: string;
            }) => (
              <HotelItem {...hotel} key={hotel.hotelId} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

HotelList.displayName = "HotelList";
