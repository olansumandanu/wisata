import { ReactNode } from "react";

export const Button = (props: { children: ReactNode }) => {
  return (
    <button
      {...props}
      data-button
      className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-[#019DA9] focus:outline-none bg-white rounded-lg border border-[#019DA9] hover:bg-gray-100 hover:text-[#019DA9] focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex gap-1 items-center "
    >
      {props.children}
    </button>
  );
};

Button.displayName = "Button";
