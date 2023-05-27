import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const useProductById = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const product = await fetch(
        `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
      );

      const { result } = await product.json();

      setProduct(result);
    }

    fetchData();
  }, [id]);

  return product;
};
