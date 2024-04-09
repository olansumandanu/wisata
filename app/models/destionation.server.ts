import { prisma } from "~/utils/db.server";

export interface ICity {
  id?: number;
  city: string;
  cityId: number;
  country: string;
  typeName: string;
  tags?: string[];
}

export async function searchCity(key: string) {
  return prisma.destionation.findMany({
    where: { tags: { has: key.toLocaleLowerCase() } },
    select: {
      id: true,
      city: true,
      cityId: true,
      country: true,
      typeName: true,
    },
  });
}

export async function createMany(data: ICity[]) {
  return await prisma.destionation.createMany({
    data: data,
    skipDuplicates: true,
  });
}
