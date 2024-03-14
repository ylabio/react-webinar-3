import { memo, useCallback, useEffect, useState } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import Navigation from "../../components/navigation";
import Menu from "../../components/menu";
import { useParams } from "react-router-dom";

function Main() {
  const store = useStore();
  // const [currentPage, setCurrentPage] = useState(1);
  /* let { page } = useParams();
  if (page !== undefined) {

  }
  console.log("page=", page); */
  useEffect(() => {
    store.actions.catalog.load(1);
  }, []);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    count: state.catalog.count,
    page: state.catalog.page,
    
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  console.log("page=", select.page);
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
    // Переход на страницу товара
    onTransition: useCallback(
      (_id) => store.actions.productDetails.load(_id),
      []
    ),
    // Смена номера страницы каталога
    changePage: useCallback((page) => store.actions.catalog.load(page), []),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return (
          <Item
            item={item}
            onTransition={callbacks.onTransition}
            onAdd={callbacks.addToBasket}
          />
        );
      },
      [callbacks.addToBasket]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Navigation>
        <Menu />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </Navigation>
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        currentPage={select.page}
        totalArticles={select.count}
        changePage={callbacks.changePage}
      />
    </PageLayout>
  );
}

export default memo(Main);
