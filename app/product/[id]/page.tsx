"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { IProduct } from "@/app/components/ProductCard/ProductCard";
import { Navigation } from "@/app/components/Navigation";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Photo } from "@prisma/client";
import AppAxios from "@/app/axios/AppAxios";

interface IProductImagesCarousel {
  photos: Photo[];
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await AppAxios(`/product/${id}`);
      console.log(response.data.data);

      setProduct(response.data.data);
    } catch (error) {
      console.error("Error fetching product:", error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!product)
    return <div className="p-4 text-red-500">Produk tidak ditemukan.</div>;

  return (
    <div className="bg-slate-200">
      <div className="max-w-5xl m-auto bg-white">
        <Navigation />
        <div className="p-4 space-y-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <ProductImagesCarousel photos={product.images} />
          <p className="text-lg font-semibold">
            {product.ram
              ? `${product.ram}/${product.memori}GB`
              : `${product.memori}GB`}
          </p>
          <p className="text-xl text-orange-600 font-bold">
            Rp {Number(product.price).toLocaleString("id-ID")}
          </p>
          {product.isSold && (
            <div className="bg-red-500 text-white font-semibold p-2 rounded">
              Terjual
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductImagesCarousel(props: IProductImagesCarousel) {
  console.log(props);
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {props.photos.map((value, i) => (
          <CarouselItem key={value.id}>
            <img src={value.url} alt={value.id} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="relative flex items-center justify-center gap-20 mt-3">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}
