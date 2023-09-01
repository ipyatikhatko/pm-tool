const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  try {
    // Create users
    const user1 = await prisma.user.create({
      data: {
        email: 'user1@example.com',
        password: 'password1',
        avatar: 'https://example.com/avatar1.jpg',
      },
    });

    const user2 = await prisma.user.create({
      data: {
        email: 'user2@example.com',
        password: 'password2',
        avatar: 'https://example.com/avatar2.jpg',
      },
    });

    // Create projects
    const project1 = await prisma.project.create({
      data: {
        title: 'Project 1',
        ownerId: user1.id,
      },
    });

    const project2 = await prisma.project.create({
      data: {
        title: 'Project 2',
        ownerId: user2.id,
      },
    });

    // Create categories
    const category1 = await prisma.category.create({
      data: {
        name: 'Category A',
        projectId: project1.id,
      },
    });

    const category2 = await prisma.category.create({
      data: {
        name: 'Category B',
        projectId: project2.id,
      },
    });

    // Create tasks
    const task1 = await prisma.task.create({
      data: {
        title: 'Task 1',
        description: 'Description for Task 1',
        projectId: project1.id,
        assigneeId: user2.id,
        status: 'In Progress',
      },
    });

    const task2 = await prisma.task.create({
      data: {
        title: 'Task 2',
        description: 'Description for Task 2',
        projectId: project2.id,
        assigneeId: user1.id,
        status: 'To Do',
      },
    });

    // Create comments
    await prisma.comment.create({
      data: {
        text: 'Comment 1 on Task 1',
        taskId: task1.id,
        userId: user1.id,
      },
    });

    await prisma.comment.create({
      data: {
        text: 'Comment 2 on Task 2',
        taskId: task2.id,
        userId: user2.id,
      },
    });

    console.log('Seed data created successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
