import { memo, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import useDictionary from "../../store/use-dictionary";

import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import BarPagination from "../../components/bar-pagination";
import Menu from "../../components/menu";
import NavBar from "../../components/nav-bar";
import Loading from "../../components/loading";

import { getPaginationArray } from "../../utils";

function Main() {
  const { currentDictionary } = useDictionary();
  const store = useStore();

  const [params] = useSearchParams();
  const page = params.get('page');

  useEffect(() => {
    store.actions.catalog.setPerPage(10);
  }, []);

  useEffect(() => {
    store.actions.catalog.loadPage(Number(page))
  }, [page]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    perPage: state.catalog.page,
    currentPage: state.catalog.currentPage,
    isLoading: state.catalog.isLoading,
    totalCountPage: state.catalog.totalCountPage,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    loadNewPage: useCallback((currentPage) => store.actions.catalog.loadPage(currentPage), [store]),
    getPaginationArray: (currentPage, totalCountPages) => getPaginationArray(currentPage, totalCountPages),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item
        item={item}
        onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title={currentDictionary.main.headTitle} />
      <NavBar>
        <Menu />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </NavBar>
      {!select.isLoading ?
        <>
          <List list={select.list} renderItem={renders.item} />
          <BarPagination
            loadNewPage={callbacks.loadNewPage}
            currentPage={select.currentPage}
            totalCountPages={select.totalCountPages}
            getPaginationArray={callbacks.getPaginationArray}
          />
        </>
        :
        <Loading />
      }
    </PageLayout>
  )
}

export default memo(Main);
