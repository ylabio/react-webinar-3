import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

import Head from '../../components/head';
import ProductCard from '../../components/product-card';
import Actions from '../../components/actions';
import Navigation from '../../components/navigation';
import Loader from '../../components/loader';
import BasketTool from '../../components/basket-tool';
import PageLayout from '../../components/page-layout';

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

  async function getProductFullInfo() {
    const { itemId } = productStore.state;
    const res = await fetch(
      `${DEFAULT_QUERY}/${itemId}?fields=*,madeIn(title,code),category(title)&lang=ru`,
    );
    const json = await res.json();
    if (!json.error) {
      setProduct({ ...json.result });
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProductFullInfo();
  }, [isLoading]);

  return (
    <PageLayout>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Head title={product.title} />
          <Actions>
            <Navigation />
            <BasketTool
              onOpen={callbacks.openModalBasket}
              amount={select.amount}
              sum={select.sum}
            />
          </Actions>
          <ProductCard item={product} onAddToBasket={callbacks.addProductToBasket} />
        </>
      )}
    </PageLayout>
  );
}

export default Product;
