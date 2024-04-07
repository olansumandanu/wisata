import { ReactNode } from "react";

export const Button = (props: { children: ReactNode }) => {
  return (
    <button
      {...props}
      data-button
      className="py-1.5 md:py-2.5 px-2 md:px-5 me-2 mb-2 text-xs md:text-sm font-light text-nowrap md:font-medium text-[#019DA9] focus:outline-none bg-white rounded-lg border border-[#019DA9] hover:bg-gray-100 hover:text-[#019DA9] focus:z-10 focus:ring-4 focus:ring-gray-100 inline-flex gap-1 items-center "
    >
      {props.children}
    </button>
  );
};

Button.displayName = "Button";
