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
    lang: state.language.lang,
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    switchLanguage: useCallback(lang => store.actions.language.switch(lang), [store])
  }

  return (
    <PageLayout>
      <Head title={select.product.title} link='/' onClick={callbacks.switchLanguage} />
      <Navigation onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} lang={select.lang} />
      <ProductCard product={select.product} onAdd={callbacks.addToBasket} />
    </PageLayout>
  );
}

export default memo(Product);