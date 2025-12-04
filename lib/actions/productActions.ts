"use server";

import { LATEST_PRODUCTS_LIMIT } from "../constants";
import { prisma } from "../../db/prisma";
import { convertPrismaObjectToPlainObject } from "../utils";
// Get the latest products
export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });

  return convertPrismaObjectToPlainObject(data);
}

export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({
    where: { slug: slug },
  });
}
