import { ReactNode } from "react";

export const Card = (props: { children: ReactNode }) => {
  return (
    <div className="rounded-lg bg-white py-4 px-8 space-y-2">
      {props.children}
    </div>
  );
};

Card.displayName = "Card";
