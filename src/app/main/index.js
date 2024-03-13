import { memo, useCallback, useEffect, useState } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Navbar from "../../components/navbar";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/pagination";

function Main() {
  const store = useStore();

  const navigate = useNavigate();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    itemsCount: state.catalog.itemsCount,
    itemsPerPage: state.catalog.itemsPerPage,
    currentPage: state.catalog.currentPage,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),

    navigateToItemPage: useCallback(
      (_id) => navigate(`item/${_id}`),
      [navigate]
    ),

    changePage: useCallback(
      (pageNumber) => {
        const skip = (pageNumber - 1) * select.itemsPerPage;

        store.actions.catalog.load(skip);

        store.actions.catalog.changePage(pageNumber);
      },
      [store]
    ),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return (
          <Item
            item={item}
            onAdd={callbacks.addToBasket}
            onTitleClick={callbacks.navigateToItemPage}
          />
        );
      },
      [callbacks.addToBasket]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Navbar navList={[{ name: "Главная", path: "/" }]}>
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </Navbar>
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        currentPage={select.currentPage}
        pagesCount={Math.ceil(select.itemsCount / 10)}
        onPageChange={callbacks.changePage}
      />
    </PageLayout>
  );
}

export default memo(Main);
