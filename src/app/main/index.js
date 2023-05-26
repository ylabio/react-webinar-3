import { memo, useCallback, useEffect, useState } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Pagination from "../../components/pagination";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { getTranslation } from "../../utils";

function Main() {
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.currentPage,
    totalPages: state.catalog.totalPages,
    languages: state.language,
  }));

  const [currentPage, setCurrentPage] = useState(select.currentPage);

  const handlePageChange = useCallback(
    (page) => {
      setCurrentPage(page);
      store.actions.catalog.load(page);
    },
    [setCurrentPage, store]
  );

  const callbacks = {
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

  if (select.list.length === 0) {
    // Render loading state
    return <div>Loading...</div>;
  }

  return (
    <PageLayout>
      <Head title={getTranslation("store")} />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        currentPage={currentPage}
        totalPages={select.totalPages}
        onPageChange={handlePageChange}
      />
    </PageLayout>
  );
}

export default memo(Main);
