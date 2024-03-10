import { memo, useCallback, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import ProductCard from '../../components/product-card';
import Navigation from '../../components/navigation';

function Product() {

  const store = useStore();
  const params = useParams();

  useEffect(() => {
    store.actions.product.load(params.id);
  }, [params.id]);

  const select = useSelector(state => ({
    product: state.product.data,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return (
    <PageLayout>
      <Head title={select.product.title} />
      <Navigation lang={select.lang} onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <ProductCard product={select.product} onAdd={callbacks.addToBasket} />
    </PageLayout>
  );
}

export default memo(Product);