import { memo, useCallback, useEffect, useState } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import HomePage from '../home-page';
import { Link, Route, Routes } from 'react-router-dom';
import './style.css';
import ProductPage from '../product-page';

function Main() {
  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount || 0,
    sum: state.basket.sum || 0,
  }));

  const callbacks = {
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <div className="navigation">
        <Link className="link" to={'/'}>
          Главная
        </Link>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      </div>

      <Routes>
        <Route path="/" element={<HomePage store={store} />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </PageLayout>
  );
}

export default memo(Main);
