import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import Head from '../../components/head';
import ProductCard from "../../components/product-card";

import BasketTool from '../../components/basket-tool';
import PageLayout from '../../components/page-layout';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';


import { DEFAULT_QUERY } from '../../query/constants';


function Product() {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({});

  const store = useStore();
  const productStore = useLocation();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addProductToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  async function getProductFullInfo(id) {
    const res = await fetch(
      `${DEFAULT_QUERY}/${id}?fields=*,madeIn(title,code),category(title)&lang=ru`,
    );
    const json = await res.json();
    if (!json.error) {
      setProduct({ ...json.result });
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const { itemId } = productStore.state;
    getProductFullInfo(itemId);
  }, [isLoading]);

  return (
    <PageLayout>
      {isLoading ? (
        <h1>Loader</h1>
      ) : (
        <>
          <Head title={product.title} />
          <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
          <ProductCard item={product} onAddToBasket={callbacks.addProductToBasket} />
        </>
      )}
    </PageLayout>
  );
}

export default Product;
