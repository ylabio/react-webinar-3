import React, { useCallback, useEffect } from "react";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Item from "../../components/item";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Paginator from "../../components/paginator";
import {useLanguage} from "../../LanguageContext";

function Home() {
  const store = useStore();
  const {tr} = useLanguage()

  useEffect(() => {
    store.actions.catalog.load({ page: 1 });
  }, [store.actions.catalog]);

  const list = useSelector((state) => state.catalog.list);
  const totalPages = useSelector((state) => state.catalog.totalPages);
  const currentPage = useSelector((state) => state.catalog.currentPage); // Используем текущую страницу из состояния

  const addToBasket = useCallback((_id) => store.actions.basket.addToBasket(_id), [store]);

  const handlePageChange = (page) => {
    store.actions.catalog.load({ page });
  };

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={addToBasket} />;
      },
      [addToBasket]
    ),
  };

  return (
    <>
      <Head title={tr('store')} />
      <BasketTool />
      <List list={list} renderItem={renders.item} />
      <Paginator totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </>
  );
}

export default React.memo(Home);
