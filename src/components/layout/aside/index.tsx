"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

const links = ["/", "dashboard", "projects", "tasks"];

const LayoutAside = () => {
  const pathname = usePathname();
  return (
    <aside className="row-span-2 lg:rounded-lg lg:px-4 h-full lg:bg-gray-100 overflow-hidden divide-y divide-slate-300">
      <div className="hidden sm:grid place-content-center h-[80px] ">
        <span className="text-slate-600 text-2xl font-bold">PMTool</span>
      </div>
      <div className="py-4 sm:pt-4 sm:mb-4 flex lg:flex-col gap-5 overflow-scroll lg:overflow-auto">
        {links.map((path) => {
          const isActive = pathname.includes(path);
          return (
            <Link key={path} href={path}>
              <Button
                className={clsx(
                  "capitalize min-w-[120px] lg:w-full rounded-full",
                  !isActive && "text-slate-500 hover:bg-slate-200"
                )}
                size="sm"
                variant={isActive ? "default" : "ghost"}
              >
                {path == "/" ? "Home" : path}
              </Button>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default LayoutAside;
