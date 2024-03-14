import { memo, useCallback, useEffect, useState } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";



function Main() {
  const store = useStore();
  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    
  }));

  const callbacks = {
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
    onPageClick: useCallback(
      (page) => {
        setCurrentPage(page);
        store.actions.catalog.load(page);
      },
      [store]
    ),
  };

  const renders = {
    item: useCallback(
      (item) => <Item item={item} onAdd={callbacks.addToBasket} />,
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
        activePage={currentPage}
        totalPages={55}
        onChange={callbacks.onPageClick}
      />
    </PageLayout>
   
  );
}

export default memo(Main);
