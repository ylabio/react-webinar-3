import React, {useCallback, useEffect, useState} from "react";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import ProductInfo from "../../components/product-info";
import {useParams} from "react-router-dom";
import useStore from "../../store/use-store";

function SingleProduct () {

  const {id} = useParams()
  const store = useStore();

  const [product, setProduct] = useState(null)

  const addToBasket = useCallback(_id => store.actions.basket.addToBasket(_id), [store])

  useEffect(() => {
    const getProduct = async () => {
      try {
        const fields = '_id,title,edition,price,description,madeIn(title),category(title)'
        const response = await fetch(`/api/v1/articles/${id}?fields=${fields}`);
        const json = await response.json();
        setProduct(json.result)
      } catch (e) {
        console.error(e)
      }
    }
    getProduct()
  }, [id]);

  return (
    <>
      {product && (
        <>
          <Head title={product.title} />
          <BasketTool />
          <ProductInfo product={product} onAdd={addToBasket} />
        </>
      )}
    </>
  )
}


export default React.memo(SingleProduct);