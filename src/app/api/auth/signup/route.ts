import { Prisma, PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {

  const { email, password } = await req.json();
  console.log(email, password)
  // Hash the password before storing it
  const hashedPassword = await hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        password: hashedPassword,
        email: email,
      },
    });

    // Return a success response
    return new NextResponse(
      JSON.stringify({
        message: 'User created successfully',
        user: {
          email: newUser.email,
          username: newUser.username
        }
      }),
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return new NextResponse(JSON.stringify({ message: 'User with this email already exists' }), { status: 400 })
      }
    }
    // Handle errors, such as duplicate username or email
    return new NextResponse(JSON.stringify({ message: 'User creation failed' }), { status: 400 })
  }
}