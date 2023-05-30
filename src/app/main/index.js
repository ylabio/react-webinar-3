import { memo, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import Loading from "../../components/loading";
import NavBar from "../../components/nav-bar";
import NavMenu from "../../components/nav-menu";
import useTranslate from "../../store/use-translate";

function Main() {
  const store = useStore();
  const [isLoading, setIsLoading] = useState(true);

  const id = useParams().id || 1;

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.currentPage,
    totalPages: state.catalog.totalPages,
  }));

  useEffect(() => {
    setIsLoading(true);
    store.actions.catalog
      .load(id)
      .then(() => setIsLoading(false))
      .catch((err) => console.log(err));
  }, [id]);

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
    setCurrentPage: useCallback(
      (number) => store.actions.catalog.setCurrentPage(number),
      [store]
    ),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return (
          <Item item={item} onAdd={callbacks.addToBasket} link="articles" />
        );
      },
      [callbacks.addToBasket]
    ),
  };

  return (
    <>
      <PageLayout>
        <Head title={useTranslate('mainTitle')} />
        {isLoading && <Loading />}
        {!isLoading && (
          <>
            <NavBar>
              <NavMenu />
              <BasketTool
                onOpen={callbacks.openModalBasket}
                amount={select.amount}
                sum={select.sum}
              />
            </NavBar>

            <List list={select.list} renderItem={renders.item} />
            <Pagination
              totalPages={select.totalPages}
              currentPage={parseInt(select.currentPage)}
              category="catalog"
            />
          </>
        )}
      </PageLayout>
    </>
  );
}

export default memo(Main);
