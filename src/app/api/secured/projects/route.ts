import { prisma } from "@/db";
import { ExtendedJWT } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET }) as ExtendedJWT
  if (!session) return NextResponse.redirect('/', { status: 401 })


  const { title, description, statuses } = await req.json();
  const newProject = await prisma.project.create({
    data: {
      ownerId: session.user.id,
      title,
      description,
      statuses: {
        createMany: {
          data: statuses
        }
      }
    }
  })

  return NextResponse.json(newProject, { status: 200 })
}