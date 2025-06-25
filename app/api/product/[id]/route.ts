import { prisma } from "@/lib/prisma";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const idProduct = (await params).id;

    const products = await prisma.product.findUnique({
      where: { id: idProduct },
      include: { images: true },
    });

    return Response.json({ data: products });
  } catch (error) {
    console.log(error);
    return Response.json({ data: "something wrong", status: 400 });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const idProduct = (await params).id;

    await prisma.photo.deleteMany({
      where: { productId: idProduct },
    });
    await prisma.product.delete({ where: { id: idProduct } });

    return Response.json({ data: "Data Deleted" });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
    return Response.json({ data: "something wrong" });
  }
}