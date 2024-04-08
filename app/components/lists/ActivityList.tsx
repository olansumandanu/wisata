import KlookIcon from "~/assets/images/image 8.svg";
import { ActivityItem } from "./ActivityItem";

export const ActivityList = ({
  klooks,
}: {
  klooks: {
    data: {
      title: string;
      cover_url: string;
      deep_link: string;
      review_obj: {
        star: string;
        text: string;
      };
    };
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
          {klooks.map(
            (
              klook: {
                data: {
                  title: string;
                  cover_url: string;
                  deep_link: string;
                  review_obj: {
                    star: string;
                    text: string;
                  };
                };
              },
              idx
            ) => (
              <ActivityItem {...klook} key={idx} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

ActivityList.displayName = "ActivityList";
