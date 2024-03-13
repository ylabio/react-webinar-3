import React, { memo, useCallback, useEffect } from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useParams } from 'react-router-dom';
import ProductCart from '../../components/product-cart';
import translations from '../../components/language/library';
import MainMenu from '../../components/main-menu';
import Menu from '../../components/menu';

function Product() {
  const store = useStore();
  const { id } = useParams();
  useEffect(() => {
    store.actions.product.loadById(id);
  }, [id, store.actions.catalog]);


  const select = useSelector(state => ({
    product: state.product,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language.language,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Закрытие модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
    // Изменения языка приложения
    setLanguage: useCallback(language => store.actions.language.setLanguage(language), [store])
  };


  return (
    <PageLayout>
      <Head title={select.product.title} setLanguage={callbacks.setLanguage} language={select.language} />
      <MainMenu>
        <Menu main={translations[select.language].main} />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} language={translations[select.language]} />
      </MainMenu>
      {select.product._id && <ProductCart product={select.product} onAdd={callbacks.addToBasket} />}
    </PageLayout>
  );
}

export default memo(Product);
