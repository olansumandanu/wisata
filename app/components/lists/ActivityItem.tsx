import { NavLink } from "@remix-run/react";

export const ActivityItem = ({
  data,
}: {
  // klook: {
  data: {
    title: string;
    cover_url: string;
    deep_link: string;
    review_obj: {
      star: string;
      text: string;
    };
    // };
  };
}) => {
  return (
    <div
      className="rounded-lg w-[165px] h-[225px] bg-cover bg-opacity-10"
      style={{ backgroundImage: `url(${data.cover_url})` }}
    >
      <div className="relative h-full">
        <p className="text-xs font-light text-white px-3 pt-2">
          {data.title as string}
        </p>
        <div className="text-sm font-light absolute bottom-0 right-0 left-0 mx-4 my-4 flex flex-col gap-2">
          <div className="bg-white rounded-full inline-flex gap-2 w-fit px-2 py-1 items-center">
            <svg
              className="w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>{" "}
            {data.review_obj.star as string}
          </div>
          <p className="text-xs font-light text-white">
            {data.title as string}
          </p>
          <NavLink
            className="bg-[#FF0080] text-white text-center rounded-lg text-sm font-light px-2 py-1 "
            to={data.deep_link}
          >
            Pesan Sekarang
          </NavLink>
        </div>
      </div>
    </div>
  );
};

ActivityItem.displayName = "ActivityItem";
