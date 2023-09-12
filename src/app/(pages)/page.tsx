import { NextRequest } from "next/server";
import { CreateProjectDialog } from "@/features/projects";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { getUserProjects } from "@/api/projects/getUserProjects";
import getSession from "@/api/auth/getSession";
import ProjectCard from "@/features/projects/components/ProjectCard";

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
              <CreateProjectDialog />
            </AlertDescription>
          </Alert>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.id} data={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
