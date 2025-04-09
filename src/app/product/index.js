import { memo, useCallback, useEffect, useState } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Basket from '../basket';
import { Link, useParams } from 'react-router-dom';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import Button from '../../components/button';
import { numberFormat } from '../../utils';
import { useLanguage } from '../../translation/language-context';
import ProductCard from '../../components/product-card';
import Navigation from '../../components/navigation';

function Product() {
  const store = useStore();
  const activeModal = useSelector(state => state.modals.name);
  const cn = bem('Product');
  const { translation } = useLanguage();

  const params = useParams();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    article: state.catalog.article,
    lang: state.catalog.lang,
  }));

  useEffect(() => {
    store.actions.catalog.loadId(params.id);
  }, [params, select.lang]);

  console.log(select);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket],
    ),
  };

  return (
    <>
      <PageLayout>
        <Head title={select.article.title} />
        <Navigation onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
        <ProductCard article={select.article} onClick={() => callbacks.addToBasket(params.id)} />
      </PageLayout>
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default memo(Product);
