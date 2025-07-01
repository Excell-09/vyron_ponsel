"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import getProducts from "../utils/api/getProducts";
import useDebounce from "../utils/useDebounce";
import { IProduct, ProductCard } from "./ProductCard/ProductCard";
import ProductCardContainer from "./ProductCard/ProductCardSkeleton";

export default function ProductContent() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const debouncedQuery = useDebounce(query, 800);

  const fetchProducts = async () => {
    setLoading(true);
    const result = await getProducts(debouncedQuery);
    setProducts(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [debouncedQuery]);

  return (
    <section className="px-5">
      <div className="max-w-lg mx-auto my-5 flex items-center gap-1">
        <Input
          type="search"
          placeholder="Mau Main Game Dengan Hp Apa?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="button">
          <Search />
        </Button>{" "}
      </div>

      {/* view all products */}
      {loading ? (
        <ProductCardContainer />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {products.map((value) => (
            <ProductCard {...value} key={value.id} />
          ))}
        </div>
      )}
    </section>
  );
}
