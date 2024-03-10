import {memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import { langData } from '../../store/language/langData';
import Error from '../../components/error';
import Loader from '../../components/loader';
import LanguageTool from '../../components/language-tool';

function Main() {
  const store = useStore();
  
  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    isError: state.catalog.isError,
    isLoading: state.catalog.isLoading,
    currentPage: state.catalog.currentPage,
    totalPages: state.catalog.totalPages,
    language: state.language.currentLanguage
  }));
  
  const translations = {
    headTitle: langData[select.language].shop
  }

  useEffect(() => {
    store.actions.catalog.load(select.currentPage);
  }, []); 

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    onPageChange: useCallback(page => store.actions.catalog.load(page), [store]),
    toggleLanguage: useCallback(() => store.actions.language.toggleLanguage(), [store])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} link={`product/${item._id}`} language={select.language}/>
    }, [callbacks.addToBasket, select.language]),
  };

  return (
    <PageLayout>
      <Head title={translations.headTitle}>
        <LanguageTool language={select.language} toggleLanguage={callbacks.toggleLanguage}/>
      </Head>
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        language={select.language}/>
      <Loader isLoading={select.isLoading} language={select.language}>
        <Error isError={select.isError} language={select.language}>
          <List list={select.list} renderItem={renders.item}/>
          <Pagination
            changePage={callbacks.onPageChange}
            totalPages={select.totalPages}
            currentPage={select.currentPage}/>
        </Error>
      </Loader>  
    </PageLayout>
  );
}

export default memo(Main);
