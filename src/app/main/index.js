import { memo, useCallback, useEffect } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Basket from "../basket";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Paginator from "../../components/paginator";

function Main() {
  const store = useStore();
  const activeModal = useSelector((state) => state.modals.name);

  // translator
  const t = store.actions.translator.useTranslate();

  useEffect(() => {
    store.actions.catalog.load(select.currentPage);
  }, []);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    currentPage: state.catalog.currentPage,
    itemsTotal: state.catalog.itemsTotal,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.translator.language,
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
    <>
      {activeModal === "basket" && <Basket />}
      <PageLayout>
        <Head title={t("Магазин")} />
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
    </>
  );
}

export default memo(Main);
