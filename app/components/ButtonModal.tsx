import { ReactNode } from "react";

export const ButtonModal = (props: {
  children: ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: () => void;
}) => {
  return (
    <button
      {...props}
      className="bg-white border border-gray-400 text-center focus:bg-[#019DA9] hover:bg-[#019DA9] hover:text-white focus:text-white gap-2 md:text-sm rounded-full text-xs px-5 py-2 inline-flex items-center justify-center flex-1"
    >
      {props.children}
    </button>
  );
};

ButtonModal.displayName = "ButtonModal";
