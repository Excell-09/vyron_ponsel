import { prisma } from "@/lib/prisma";
import { Product } from "@prisma/client";

export type TProduct = Omit<Product, "isSold"> & {
  images: string;
};

export async function POST(request: Request) {
  try {
    const {
      name,
      ram,
      memori,
      description,
      price,
      images,
      code,
      brand,
      video,
    }: TProduct = await request.json();

    const create_product = await prisma.product.create({
      data: {
        name,
        ram,
        memori,
        description,
        price,
        code,
        brand,
        video,
      },
    });

    for (const photolink of images) {
      await prisma.photo.create({
        data: { url: photolink, productId: create_product.id },
      });
    }

    return Response.json({ data: "product success" });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
    return Response.json({ data: "something wrong", status: 400 });
  }
}
