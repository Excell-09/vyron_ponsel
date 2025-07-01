"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Photo, Product } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export interface IProduct extends Product {
  images: Photo[];
}

interface IProductContent {
  name: string;
  ram: number | null;
  memori: number;
  price: number;
}

export function ProductCard(props: IProduct) {
  const router = useRouter();
  const DAYS_NEW = 3;
  const createdAt = new Date(props.createdAt);
  const now = new Date();
  const diffInDays =
    (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
  const isNew = diffInDays <= DAYS_NEW;

  return (
    <Card
      className="w-full max-w-sm overflow-hidden relative"
      onClick={
        props.isSold ? () => {} : () => router.push(`/product/${props.id}`)
      }
    >
      {props.isSold ? (
        <div className="absolute bg-gray-500 h-full w-full opacity-80 top-0 left-0 z-30">
          <div className="flex justify-center items-center h-full z-40">
            <p className="text-white font-semibold text-2xl bg-red-600 p-2 rounded-xs">
              Terjual
            </p>
          </div>
        </div>
      ) : null}
      <CardHeader className="relative">
        {isNew && !props.isSold ? (
          <Badge asChild className="absolute top-2 left-2">
            <p className="">New</p>
          </Badge>
        ) : null}

        <Badge
          asChild
          variant={"secondary"}
          className="absolute top-2 right-2 "
        >
          <p className="font-semibold">COD</p>
        </Badge>

        <Badge
          asChild
          variant={"secondary"}
          className="absolute bottom-3 right-2 "
        >
          <p className="font-semibold">Mulus 99%</p>
        </Badge>

        <img
          src={props.images[0].url}
          alt={props.name}
          className="w-full aspect-square object-cover object-center"
        />
      </CardHeader>

      <CardContent>
        <ProductContent {...props} />
      </CardContent>

      <CardFooter>
        <Button className="w-full rounded-none" size={"sm"}>
          Beli Sekarang
        </Button>
      </CardFooter>
    </Card>
  );
}

function ProductContent(props: IProductContent) {
  return (
    <>
      <div className="flex items-center justify-between text-sm text-primary font-medium">
        <p>Garansi Toko</p>
      </div>
      <CardTitle>{props.name}</CardTitle>
      <p className="font-medium my-1">
        {props.ram ? `${props.ram}/${props.memori}GB` : `${props.memori}GB`}
      </p>
      <p className="mt-2">Rp {Number(props.price).toLocaleString("id-ID")}</p>
    </>
  );
}
