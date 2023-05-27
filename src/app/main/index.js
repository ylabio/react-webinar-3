import { memo, useCallback, useEffect } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import { useSearchParams } from "react-router-dom";
import Basket from "../basket";
import { NavigationMenu } from "../../components/navigation-menu";

function Main() {
  const store = useStore();

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");

  useEffect(() => {
    store.actions.catalog.load(page);
  }, []);

  useEffect(() => {
    store.actions.catalog.load(page);
  }, [page]);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    currentPage: state.catalog.currentPage,
    totalPages: state.catalog.totalPages,
    amount: state.basket.amount,
    sum: state.basket.sum,
    modal: state.modals.name,
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
  };

  const renders = {
    item: useCallback(
      (item) => {
        return (
          <Item
            item={item}
            onAdd={callbacks.addToBasket}
            link={`/product/${item._id}`}
          />
        );
      },
      [callbacks.addToBasket]
    ),
  };

  return (
    <>
      {select.modal === "basket" && <Basket />}
      <PageLayout>
        <Head title="Магазин" />
        <NavigationMenu
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
        <List list={select.list} renderItem={renders.item} />
        {select.totalPages && (
          <Pagination currentPage={page} totalPages={select.totalPages} />
        )}
      </PageLayout>
    </>
  );
}

export default memo(Main);
