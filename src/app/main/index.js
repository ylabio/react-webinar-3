import {memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import { Link,useParams } from 'react-router-dom';
import { langArr } from '../../utils';
import Menu from '../../components/menu';


function Main({language,setLanguage}) {
  
  const store = useStore();
  const params = useParams();

  
  useEffect(() => {
    const id = Number(params.id) || 1;
    store.actions.catalog.load(id);
  }, [params]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
    page: state.catalog.page,
  }));
  
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

    onChangePage:useCallback(page => store.actions.catalog.load(page),[store])
    
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} language={language}/>
    }, [callbacks.addToBasket,language]),
  };
  
  return (
    
    <PageLayout>
        <Menu title={langArr.shop[language]} language={language} setLanguage={setLanguage} openModalBasket={callbacks.openModalBasket} sum={select.sum} amount={select.amount}/>
        <List list={select.list} renderItem={renders.item}/>
        <Pagination totalItems={select.count} onChangePage={callbacks.onChangePage} number={select.page} link={'/'}/>
    </PageLayout>
    

  );
}

export default memo(Main);