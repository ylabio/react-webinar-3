import { memo, useCallback, useEffect } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Paginator from "../../components/paginator";

function Main() {
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load(select.currentPage);
  }, []);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    currentPage: state.catalog.currentPage,
    itemsTotal: state.catalog.itemsTotal,
    amount: state.basket.amount,
    sum: state.basket.sum,
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
    // Переход на другую страницу
    changePage: useCallback(
      (page) => {
        if (page !== select.currentPage) store.actions.catalog.load(page);
      },
      [store, select.currentPage]
    ),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <List list={select.list} renderItem={renders.item} />
      {select.itemsTotal > 10 && (
        <Paginator
          currentPage={select.currentPage}
          itemsTotal={select.itemsTotal}
          changePage={callbacks.changePage}
        />
      )}
    </PageLayout>
  );
}

export default memo(Main);
