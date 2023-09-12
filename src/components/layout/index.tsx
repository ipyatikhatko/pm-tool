import React, { ReactNode } from "react";
import PrivateHeader from "./header";
import LayoutAside from "./aside";

type Props = {
  children: ReactNode;
};

const PrivateLayout = ({ children }: Props) => {
  return (
    <div className="p-4 lg:min-h-screen max-w-screen-xl lg:py-16 xl:py-24 2xl:py-32 mx-auto grid gap-2 lg:gap-4 grid-cols-1 grid-flow-row grid-rows-[50px_1fr] lg:grid-cols-[250px_1fr]">
      <LayoutAside />
      <section className="h-full grid gap-2 lg:gap-4 grid-rows-[60px_1fr] lg:grid-rows-[80px_1fr]">
        <PrivateHeader />
        <main>{children}</main>
      </section>
    </div>
  );
};

export default PrivateLayout;
