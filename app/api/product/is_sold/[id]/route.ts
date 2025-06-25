import { prisma } from "@/lib/prisma";

export async function PATCH(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const idProduct = (await params).id;

    const products = await prisma.product.update({
      where: { id: idProduct },
      data: { isSold: true },
    });

    return Response.json({ data: "Product Is Sold Updated!" });
  } catch (error) {
    console.log(error);
    return Response.json({ data: "something wrong", status: 400 });
  }
}
