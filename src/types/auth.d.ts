import "next-auth";
import { JWT } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from 'next/headers';
import { getServerSession as originalGetServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session } from "next/auth";

declare module "next-auth" {
  interface User {
    id: number;
    email: string;
    username: string;
  }

  interface Session {
    user: User
  }

  interface ExtendedJWT extends JWT {
    user: User
  }
}




