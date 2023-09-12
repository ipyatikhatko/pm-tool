"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { CreateProjectForm } from "./CreateProjectForm";
import { useRouter } from "next/navigation";
import { Prisma, Project } from "@prisma/client";

type Props = {};

const CreateProjectDialog = (props: Props) => {
  const router = useRouter();
  const onProjectCreated = (project: Project) => {
    router.push(`/projects/${project.id}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Create a project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="font-bold">Create a project</DialogHeader>
        <CreateProjectForm onCreated={onProjectCreated} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog;
