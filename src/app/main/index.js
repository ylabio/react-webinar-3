import {memo, useCallback, useEffect, useState, useMemo} from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import Loader from "../../components/loader";
import LoaderWrapper from "../../components/loader-wrapper";
import NavMenu from "../../components/nav-menu";

function Main() {

  const store = useStore();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalGoods: state.catalog.totalGoods,
    isLoading: state.catalog.isLoading,
    limit: state.catalog.limit,
    pageCurrent: state.catalog.pageCurrent
  }));
  

  useEffect(() => {
    store.actions.catalog.load(select.limit, select.limit * select.pageCurrent - select.limit);
  }, [select.pageCurrent, select.limit]);

  // получаем общее число страниц(можно перенести в utils)
  const totalPages = useMemo(
    () => Math.ceil(select.totalGoods / select.limit),
    [select.totalGoods, select.limit]
  );

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

    // Установка текущей страницы
    setPageCurrent: useCallback(
      (current) => store.actions.catalog.setPageCurrent(current),
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
      <NavMenu>
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </NavMenu>
      <LoaderWrapper loader={<Loader/>} isLoading={select.isLoading}>
        <List list={select.list} renderItem={renders.item} />
      </LoaderWrapper>
      <Pagination totalPages={totalPages} page={select.pageCurrent} setPage={callbacks.setPageCurrent} />
    </PageLayout>
  );
}

export default memo(Main);
