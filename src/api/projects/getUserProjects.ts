import { prisma } from "@/db";
import getSession from "@/api/auth/getSession";
import { Prisma, Project } from "@prisma/client";

export type GetUserProjectsResult = (Prisma.ProjectGetPayload<{
  select: {
    id: true,
    title: true,
    description: true,
    owner: true,
    createdAt: true,
    updatedAt: true
  }
}>)[];

export const getUserProjects = async (): Promise<GetUserProjectsResult> => {
  const session = await getSession()

  if (!session) {
    throw new Error('Unauthorized')
  }

  const projects = await prisma.project.findMany({
    where: {
      ownerId: session?.user.id,
    },
    select: {
      id: true,
      title: true,
      description: true,
      owner: true,
      createdAt: true,
      updatedAt: true
    }
  });

  return projects;
}