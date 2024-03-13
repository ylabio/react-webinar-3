import { memo, useCallback, useEffect, useState } from "react";
import BasketTool from "../../components/basket-tool";
import Head from "../../components/head";
import Item from "../../components/item";
import List from "../../components/list";
import Menu from "../../components/menu";
import PageLayout from "../../components/page-layout";
import Pagination from "../../components/pagination";
import Row from "../../components/row";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";

function Main() {
  const store = useStore();

  const [page, setPage] = useState(1);

  useEffect(() => {
    store.actions.catalog.load(page);
  }, [page]);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    pagesAmount: state.catalog.pagesAmount,
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

    changePage: () => {},
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
      <Row>
        <Menu />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </Row>
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        currentPage={page}
        totalPages={select.pagesAmount}
        onPageChange={setPage}
      />
    </PageLayout>
  );
}

export default memo(Main);
