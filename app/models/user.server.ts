import { prisma } from "~/utils/db.server";

export interface IUser {
  id?: number | undefined;
  name?: string;
  email: string;
}

export async function getDatables() {
  const rows = await prisma.user.findMany();

  return {
    headings: [
      { title: "email", name: "email" },
      { title: "Name", name: "name" },
    ],
    rows,
    draw: 1,
    recordsTotal: rows.length,
    recordsFiltered: rows.length,
  };
}

export async function getUsers() {
  return prisma.user.findMany();
}

export async function getUsersById(userId: number) {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true },
  });
}

export async function createUser(user: IUser) {
  return user.id
    ? await prisma.user.update({
        where: { id: user.id },
        data: { ...user },
      })
    : await prisma.user.create({
        data: { email: user.email, name: user.name },
      });
}

export async function updateUser(id: number, data: IUser) {
  await prisma.user.update({ where: { id }, data });
}

export async function deleteUser(id: number) {
  await prisma.user.delete({
    where: { id },
  });
}
