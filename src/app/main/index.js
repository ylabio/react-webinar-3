import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import Menu from '../../components/menu';
import { useLocation } from 'react-router';
import React from 'react';
import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import Locale from '../../components/locale';
import { locale } from '../../locale';
import Header from '../../components/header';

function Main() {

  const { lang } = useParams();

  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    page: state.catalog.page,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  let query = useQuery();

  useEffect(() => {
    store.actions.catalog.load(Number.isInteger(+query.get("page")) ? +query.get("page") : 0);
  }, [query.get("page")]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} path={`/${lang}/article/`} lang={lang}/>
    }, [callbacks.addToBasket, lang]),
  };

  return (
    <PageLayout>
      <div style={{background: '#f5f5f5'}}>
          <Header left={<Head title={locale[lang].headers.shop}/>} right={<Locale lang={lang}/>}/>
      </div>
      <Header left={<Menu href={`/${lang}/`} lang={lang}/>} right={
          <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
              sum={select.sum} lang={lang}/>}/>
      <Suspense fallback={<div>Loading...</div>}>
        <List list={select.list} renderItem={renders.item}/>
      </Suspense>
      {select.count ? <Pagination path={`/${lang}/`} page={Number.isInteger(+query.get("page")) ? +query.get("page") : 0} count={select.count}/> : 'Loading...'}
    </PageLayout>

  );
}

export default memo(Main);
