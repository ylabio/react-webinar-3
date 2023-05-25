import React, { useCallback, useEffect } from "react";
import { useParams } from 'react-router-dom';
import BasketTool from "../../components/basket/basket-tool";
import HorizontalContainer from "../../components/container/horizontal";
import Head from "../../components/head";
import ItemArticle from "../../components/items/item-article";
import Language from "../../components/lang-selector";
import PageLayout from "../../components/layouts/page-layout";
import Menu from "../../components/menu";
import Preloader from "../../components/preloader";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";

function Article() {

  const { id } = useParams(); // вытаскиваем ид
  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    fields: state.article.fields,
    loading: state.article.loading,
    lang: state.localization.lang
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Переключение языка
    switchLanguage: useCallback(ln => store.actions.localization.setLanguage(ln), [])
  };

  useEffect(() => {
    store.actions.article.load(id);
  }, [id]);

  return (
    <PageLayout>
      <Language id={select.lang} onSelect={callbacks.switchLanguage} />
      <Head title={select.fields?.title} />
      <HorizontalContainer justifyContent='space-between'>
        <Menu />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      </HorizontalContainer>
      <Preloader isLoading={select.loading}>
        {select.fields?.title ? <ItemArticle onAdd={callbacks.addToBasket} info={select.fields} /> : null}
      </Preloader>
    </PageLayout>
  );
};

export default React.memo(Article);