import { memo, useCallback, useEffect } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useParams } from "react-router-dom";
import { ArticlesNav } from "../../components/articles-nav/articles-nav";
import { NavToolWrap } from "../../components/nav-tool-wrap";
import { NavBar } from "../../components/nav-bar";
import { links } from "../../constants";

function Main() {
  const store = useStore();

  const params = useParams();

  /* useEffect(() => {
    store.actions.catalog.load();
  }, []); */

  useEffect(() => {
    const query = params.current
      ? {
          limit: 1,
          skip: params.current,
          fields: "items(_id, title, price),count",
        }
      : null;
    store.actions.catalog.load(query);
  }, [params.current]);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    productsCount: state.catalog.productsCount,
    amount: state.basket.amount,
    sum: state.basket.sum,
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
          <Item item={item} linkTo={item._id} onAdd={callbacks.addToBasket} />
        );
      },
      [callbacks.addToBasket]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <NavToolWrap>
        <NavBar links={links} />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </NavToolWrap>
      <List list={select.list} renderItem={renders.item} />
      <ArticlesNav
        pages={Math.ceil(select.productsCount / 10)}
        current={params.current ? +params.current : 1}
      />
    </PageLayout>
  );
}

export default memo(Main);
