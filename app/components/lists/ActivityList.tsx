import { Key } from "react";

import KlookIcon from "~/assets/images/image 8.svg";
import { ActivityItem } from "./ActivityItem";

export const ActivityList = ({
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
        <p className="text-sm font-medium">Pilihan aktivitas</p>
        <img src={KlookIcon} alt="" />
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
              <ActivityItem {...hotel} key={hotel.hotelId} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

ActivityList.displayName = "ActivityList";
