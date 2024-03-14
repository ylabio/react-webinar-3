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
import { useNavigate, useParams } from "react-router-dom";

function Main() {
  const store = useStore();
  const activeModal = useSelector((state) => state.modals.name);
  const useTranslate = store.actions.translator.useTranslate();
  const navigate = useNavigate();
  const { id: page } = useParams();

  useEffect(() => {
    if (page) {
      store.actions.catalog.load(Number(page));
    } else {
      store.actions.catalog.load(1);
    }
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
        navigate(`/page/${page}`);
      },
      [store, select.currentPage]
    ),

    useTranslate: useCallback(
      (text) => useTranslate(text),
      [store, select.lang]
    ),

    langChange: useCallback(() => {
      store.actions.translator.langChange();
    }, [store]),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return (
          <Item
            item={item}
            onAdd={callbacks.addToBasket}
            useTranslate={callbacks.useTranslate}
          />
        );
      },
      [callbacks.addToBasket, callbacks.useTranslate]
    ),
  };

  return (
    <>
      {activeModal === "basket" && <Basket />}
      <PageLayout>
        <Head
          title={"Магазин"}
          lang={select.lang}
          langChange={callbacks.langChange}
          useTranslate={callbacks.useTranslate}
        />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          useTranslate={callbacks.useTranslate}
          changePage={callbacks.changePage}
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
