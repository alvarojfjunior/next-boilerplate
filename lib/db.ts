import { prisma } from "./prisma";

export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
}

export async function getAllUsers() {
  const data = await prisma.user.findMany();
  return data;
}''

export async function createUser(user:User) {
  await prisma.user.create({
    data: user,
  });
}
