import { prisma } from "@/db";
import getSession from "@/api/auth/getSession";

export const getUserProjects = async () => {
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
      owner: true
    }
  });

  return projects;
}