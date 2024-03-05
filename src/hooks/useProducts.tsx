
import { fetch, write } from "../api/apiService";

  const productCollectionName = "products";

  export async function fetchProducts() {
    return fetch(productCollectionName)
  }
  export async function writeProducts(productCollectionName, data) {
    return write(productCollectionName, data);
    
  }
