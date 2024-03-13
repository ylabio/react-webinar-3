import { memo, useCallback, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import ProductCard from '../../components/product-card';
import Navigation from '../../components/navigation';
import Loading from '../../components/loading';

function Product() {

  const store = useStore();
  const params = useParams();

  const select = useSelector(state => ({
    product: state.product.data,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language.lang,
    request: state.product.request
  }));

  useEffect(() => {
    store.actions.product.load(params.id, select.lang);
  }, [params.id, select.lang]);


  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    switchLanguage: useCallback(lang => store.actions.language.switch(lang), [store])
  }

  return (
    <PageLayout>
      <Head title={select.product.title} link='/' onClick={callbacks.switchLanguage} lang={select.lang} />
      <Navigation onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} lang={select.lang} />
      <Loading isLoad={select.request}>
        <ProductCard product={select.product} onAdd={callbacks.addToBasket} lang={select.lang} />
      </Loading>
    </PageLayout>
  );
}

export default memo(Product);