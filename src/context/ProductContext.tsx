import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchProducts } from "../hooks/useProducts";

interface Product {
  id: number;
  title: string;
  imageUrl: string;
}
interface ProductContextProps {
  products: Product[];
  isLoading: boolean;
}
const ProductContext = createContext<ProductContextProps | undefined>(
  undefined
);

export function ProductProvider({ children }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProductsData() {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProductsData();
  }, []);

  return (
    <ProductContext.Provider value={{ products, isLoading }}>
      {children}
    </ProductContext.Provider>
  );
}
export function useProductContext  () {
    const context = useContext(ProductContext);
    if(!context) {
        throw new Error('use product context must be used within a productProvider')
    }
    return context;
}
