import { useEffect } from "react";
import { useProductContext } from "../context/ProductContext";
import { fetchProducts } from "../hooks/useProducts";

export function Home() {
  const { products, isLoading } = useProductContext();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  useEffect(() => {
    console.log(products);
  }, [products]);

  return <div>dkslfjksdf</div>;
}
