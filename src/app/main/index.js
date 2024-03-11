import { memo, useCallback, useEffect, useState } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Pagination from "../../components/pagination";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Main() {
  const store = useStore();
  const limit = 10;
  const [itemCount, setItemCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    store.actions.catalog.itemCount({ setItemCount });
  }, []);

  useEffect(() => {
    store.actions.catalog.load({ currentPage, limit });
  }, [currentPage]);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),

    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
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
      <Pagination
        itemCount={itemCount}
        perPage={limit}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </PageLayout>
  );
}

export default memo(Main);
