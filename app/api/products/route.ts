import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get("q");

    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);

    const products = await prisma.product.findMany({
      where: {
        OR: [
          { isSold: false },
          { isSold: true, updatedAt: { gte: threeDaysAgo } },
        ],
      },
      include: { images: true },
    });

    if (!q || q.trim() === "") {
      return Response.json({ data: products });
    }

    const productsAddedFilterText = products.map((data) => ({
      ...data,
      filteredText:
        `${data.name} ram ${data.ram} gb memori ${data.memori} gb penyimpanan ${data.memori} gb internal ${data.memori} gb | ram ${data.ram}gb memori ${data.memori}gb penyimpanan ${data.memori}gb internal ${data.memori}gb`.toLocaleLowerCase(),
    }));

    const productFIlterd = productsAddedFilterText.filter((data) =>
      data.filteredText.includes(q.toLocaleLowerCase())
    );

    return Response.json({ data: productFIlterd });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
    return Response.json({ data: "something wrong", status: 400 });
  }
}
