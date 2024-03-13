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
import Nav from '../../components/nav';
import NavWrapper from '../../components/nav-wrapper';

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
    language: state.language.currentLanguage,
  }));
  
  const translations = {
    headTitle: langData[select.language].shop,
    nav: {
      navTitle: langData[select.language].main
    },
    languageTool: {
      language: langData[select.language].language
    },
    basketTool: {
      inCart: langData[select.language].inCart,
      one: langData[select.language].item.one,
      few: langData[select.language].item.few,
      many: langData[select.language].item.many,
      empty: langData[select.language].item.empty,
      goTo: langData[select.language].buttons.goTo
    },
    loader: {
      loading: langData[select.language].service.loading
    },
    error: {
      error: langData[select.language].service.error
    },
    item: {
      add: langData[select.language].buttons.add
    }
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
      return <Item item={item} onAdd={callbacks.addToBasket} link={`product/${item._id}`} translations={translations.item}/>
    }, [callbacks.addToBasket, select.language]),
  };

  return (
    <PageLayout>
      <Head title={translations.headTitle}>
        <LanguageTool translations={translations.languageTool} toggleLanguage={callbacks.toggleLanguage}/>
      </Head>
      <NavWrapper>
      <Nav translations={translations.nav}/>
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        translations={translations.basketTool}/>
      </NavWrapper>
      <Loader isLoading={select.isLoading} translations={translations.loader}>
        <Error isError={select.isError} translations={translations.error}>
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
