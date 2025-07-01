import AppAxios from "@/app/axios/AppAxios";
import { IProduct } from "@/app/components/ProductCard/ProductCard";

const getProducts = async (q: string): Promise<IProduct[]> => {
  try {
    const response = await AppAxios(`/products?q=${q}`);

    console.log(response);
    return response.data.data;
  } catch (error) {
    console.error("Gagal fetch data:", error);
    return [];
  }
};
export default getProducts;
