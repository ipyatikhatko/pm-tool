"use client";
import React from "react";
import { UserDropdown } from "./components/UserDropdown";
import { useSession } from "next-auth/react";

type Props = {};

const PrivateHeader = (props: Props) => {
  const { data } = useSession();

  return (
    <header>
      <div className="w-full h-full rounded-lg bg-black/80 flex items-center gap-4 px-4 ">
        <div className="flex-1 h-full">
          {/* TODO: add some stuff for desktop here, or not ¯\_(ツ)_/¯ */}
        </div>
        <UserDropdown user={data?.user.username || ""} />
      </div>
    </header>
  );
};

export default PrivateHeader;
