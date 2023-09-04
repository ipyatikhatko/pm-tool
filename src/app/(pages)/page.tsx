import { NextRequest } from "next/server";
import { CreateProjectForm } from "@/features/projects";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CalendarCheck, Clock1, Info, MoreVertical } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getUserProjects } from "@/api/projects/getUserProjects";
import getSession from "@/api/auth/getSession";
dayjs.extend(relativeTime);

export const metadata = {
  title: "PMTool | Home",
};

export default async function Home(req: NextRequest) {
  const session = await getSession();
  const projects = await getUserProjects();

  return (
    <div className="max-w-screen-xl text-slate-700">
      <h3 className="text-3xl font-bold  drop-shadow-md">
        Hi, {session?.user.username}!
      </h3>
      <div className="mt-4">
        {!projects.length ? (
          <Alert className="w-full">
            <Info className="mr-4" />
            <AlertTitle>You don&apos;t have any projects yet</AlertTitle>
            <AlertDescription className="w-full flex justify-between items-center">
              <span>don&apos;t worry, you can create one right now</span>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">Create a project</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="font-bold">
                    Create a project
                  </DialogHeader>
                  <CreateProjectForm />
                </DialogContent>
              </Dialog>
            </AlertDescription>
          </Alert>
        ) : (
          <div className="flex flex-col gap-2">
            {projects.map((project) => (
              <div
                className="h-full grid grid-cols-4 px-4 py-6 bg-white shadow-sm rounded-lg"
                key={project.id}
              >
                <div className="col-span-2">
                  <h3 className="text-lg font-bold">{project.title}</h3>
                  <p>{project.description || <i>No description</i>}</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold">Owner</h3>
                  <i className="text-center">
                    {project.owner.id == session?.user.id
                      ? "You"
                      : project.owner.username}
                  </i>
                </div>
                <div className="h-full flex justify-end items-center">
                  <Button size="icon" variant="ghost">
                    <MoreVertical />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
