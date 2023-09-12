import { prisma } from '@/db';
import { Prisma } from '@prisma/client';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

export type SignUpResponseBody = {
  message: string,
}

export async function POST(req: Request) {

  const { email, password, username } = await req.json();
  // Hash the password before storing it
  const hashedPassword = await hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email: email,
      },
    });

    // Return a success response

    return NextResponse.json<SignUpResponseBody>(
      {
        message: `User created successfully, you can login now with username ${newUser.username}`,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json({ message: 'User with this email or username already exists' }, { status: 400 })
      }
    }
    // Handle errors, such as duplicate username or email
    return NextResponse.json({ message: 'User creation failed' }, { status: 400 })
  }
}