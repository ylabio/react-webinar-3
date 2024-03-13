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
  const limit = 10;
  const [itemCount, setItemCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    store.actions.catalog.itemCount({ setItemCount });
    store.actions.languages.changeLanguage();
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
        itemCount={itemCount}
        perPage={limit}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </PageLayout>
  );
}

export default memo(Main);
