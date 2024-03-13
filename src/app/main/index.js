import { memo, useCallback, useEffect, useState } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Tabs from "../../components/tabs";
import BtnMain from "../../components/btnMain";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Pagination from "../../components/pagination";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Main() {
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.itemCount();
    store.actions.catalog.load();
  }, []);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    pagesCount: state.catalog.pagesCount,
    currentPage: state.catalog.currentPage,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id, "catalog"),
      [store]
    ),

    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),

    onChangeLang: useCallback(
      (e) => store.actions.languages.change(e),
      [store]
    ),

    onClickPage: useCallback(
      (e) => store.actions.catalog.clickPage(e),
      [store]
    ),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return (
          <Item
            item={item}
            link={"/card/" + item._id}
            onAdd={callbacks.addToBasket}
          />
        );
      },
      [callbacks.addToBasket]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" onChangeLang={callbacks.onChangeLang} />
      <Tabs>
        <BtnMain />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </Tabs>
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        currentPage={select.currentPage}
        setCurrentPage={callbacks.onClickPage}
        pagesCount={select.pagesCount}
      />
    </PageLayout>
  );
}

export default memo(Main);
