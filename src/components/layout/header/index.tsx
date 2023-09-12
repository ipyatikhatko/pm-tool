"use client";
import React from "react";
import { UserDropdown } from "./components/UserDropdown";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";

type Props = {};

const PrivateHeader = (props: Props) => {
  const { data } = useSession();

  return (
    <header>
      <div className="w-full h-full rounded-lg sm:bg-black flex items-center gap-4 sm:px-4 ">
        <div className="flex-1 h-full flex items-center">
          <Input
            className="sm:w-1/2 rounded-full"
            type="text"
            placeholder="Search tasks, projects, people..."
          />
        </div>
        <UserDropdown session={data} />
      </div>
    </header>
  );
};

export default PrivateHeader;
