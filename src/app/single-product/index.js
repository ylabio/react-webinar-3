import React, {useCallback, useEffect, useState} from "react";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import ProductInfo from "../../components/product-info";
import {useParams} from "react-router-dom";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function SingleProduct () {

  const {id} = useParams()
  const store = useStore();

  const select = {
    amount: useSelector((state) => state.basket.amount),
    sum: useSelector((state) => state.basket.sum) // Используем текущую страницу из состояния
  }

  const callbacks = {
    addToBasket: useCallback((_id) => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store])
  }

  const [product, setProduct] = useState(null)


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
          <BasketTool sum={select.sum} amount={select.amount} openModal={callbacks.openModalBasket}/>
          <ProductInfo product={product} onAdd={callbacks.addToBasket} />
        </>
      )}
    </>
  )
}


export default React.memo(SingleProduct);