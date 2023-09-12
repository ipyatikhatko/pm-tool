"use client";
import React from "react";
import Image from "next/image";
import { Prisma, Project } from "@prisma/client";
import { CalendarPlus, Clock, MoreVertical, User } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Button } from "@/components/ui/button";
import { GetUserProjectsResult } from "@/api/projects/getUserProjects";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProjectActionsDropdown } from "./ProjectActionsDropdown";

dayjs.extend(relativeTime);

type Props = {
  data: GetUserProjectsResult[0];
};

const ProjectCard = ({ data: project }: Props) => {
  console.log(project);
  return (
    <TooltipProvider delayDuration={150}>
      <div className="p-4 bg-white shadow-sm rounded-lg text-slate-600 cursor-pointer hover:outline hover:outline-2">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold line-clamp-1">
            {project.title}
          </h3>
          {/* TODO determine role of a user */}
          <ProjectActionsDropdown role="owner">
            <Button size="icon" variant="ghost">
              <MoreVertical />
            </Button>
          </ProjectActionsDropdown>
        </div>
        <p className="text-xs line-clamp-2">
          {project.description || (
            <i className="text-gray-400">No description</i>
          )}
        </p>
        <div className="mt-4 text-xs flex justify-between items-end">
          <div className="flex flex-col gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex gap-4 items-center cursor-pointer">
                  <Clock size={18} />
                  <span>{dayjs().to(project.updatedAt)}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent align="start" className="p-2">
                <h5 className="text-center font-semibold">Last updated</h5>
                <h6 className="font-light text-sm">
                  {dayjs(project.updatedAt).format("YY.MM.DD HH:mm:ss")}
                </h6>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex gap-4 items-center cursor-pointer">
                  <CalendarPlus size={18} />
                  <span>{dayjs().to(project.createdAt)}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent align="start" side="bottom" className="p-2">
                <h5 className="text-center font-semibold">Created at</h5>
                <h6 className="font-light text-sm">
                  {dayjs(project.createdAt).format("YY.MM.DD HH:mm:ss")}
                </h6>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-center gap-2">
            <h3>Owner:</h3>
            <Link href={`/people/${project.owner.username}`}>
              <span>@{project.owner.username}</span>
            </Link>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ProjectCard;
