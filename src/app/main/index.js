import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Pagination from '../../components/pagination';
import NavigationTool from '../../components/navigation-tool';
import Navigation from '../../components/navigation';
import LanguageTool from '../../components/language-tool';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { translate, availableLanguages } from '../../language/translator';

function Main() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalItems: state.catalog.count,
    itemsPerPage: state.catalog.limit,
    currentPage: state.catalog.pageNumber,
    isLoading: state.catalog.isLoading,
    language: state.language.currentLang
  }));

  useEffect(() => {
    store.actions.catalog.loadWithParams(select.currentPage, select.language);
  }, []);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Смена страницы
    setPage: useCallback(currentPage => store.actions.catalog.loadWithParams(currentPage), [store]),
    // Смена языка
    setLanguage: useCallback(lang => store.actions.language.setLanguage(lang), [store])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} link={`card/${item._id}`} onAdd={callbacks.addToBasket} translator={translator} />
    }, [callbacks.addToBasket, select.language]),
  };

  const translator = {
    dictionary: useMemo(() => translate(select.language))
  }

  return (
    <PageLayout>
      <Head title={translator.dictionary.head.title}>
        <LanguageTool setLanguage={callbacks.setLanguage} currentLanguage={select.language} availableLanguages={availableLanguages} />
      </Head>
      <NavigationTool>
        <Navigation navItems={[{title: translator.dictionary.navigation.main, link: '/'}]} />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} translator={translator} />
      </NavigationTool>
      <List list={select.list} renderItem={renders.item} isLoading={select.isLoading} translator={translator} />
      {
        select.totalItems > select.itemsPerPage ?
        <Pagination
          itemsPerPage={select.itemsPerPage}
          totalItems={select.totalItems}
          currentPage={select.currentPage}
          paginate={callbacks.setPage}
        /> : ''
      }
    </PageLayout>

  );
}

export default memo(Main);
