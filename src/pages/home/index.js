import React, {useCallback, useContext, useEffect, useState} from "react";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Paginator from "../../components/paginator";
import {useLanguage} from "../../language-provider";

function Home() {
  const store = useStore();
  const [currentPage, setCurrentPage] = useState(1);

  const { t } = useLanguage()

  useEffect(() => {
    store.actions.catalog.load({ page: currentPage });
  }, [currentPage, store.actions.catalog]);

  const list = useSelector((state) => state.catalog.list);
  const item = useSelector((state) => state.catalog.item);
  const totalPages = useSelector((state) => state.catalog.totalPages);
  console.log(item);

  const addToBasket = useCallback((_id) => store.actions.basket.addToBasket(_id), [
    store,
  ]);


  const onPageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={addToBasket} />;
      },
      [addToBasket]
    ),
  };

  return (
    <PageLayout>
      <Head title={t('store')} />
      <BasketTool />
      <List list={list} renderItem={renders.item} />
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </PageLayout>
  );
}

export default React.memo(Home);
