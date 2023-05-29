import {memo, useCallback, useEffect} from "react";
import {useParams} from "react-router-dom";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import ItemSinglePropduct from "../../components/item-single-propduct";
import Loader from "../../components/loader";
import NavMenu from "../../components/nav-menu";

import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function SinglePropductPage() {
  const params = useParams();

  const store = useStore();

  useEffect(() => {
    store.actions.article.load(params.id);
  }, [params.id]);

  const select = useSelector((state) => ({
    article: state.article.good,
    amount: state.basket.amount,
    sum: state.basket.sum,
    isLoading: state.article.isLoading,
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

  return (
    <PageLayout>
      <Head title={select.article.title} />
      <NavMenu>
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </NavMenu>
      {select.isLoading ? (
        <Loader />
      ) : (
        <ItemSinglePropduct
          article={select.article}
          onAdd={callbacks.addToBasket}
        />
      )}
    </PageLayout>
  );
}

export default memo(SinglePropductPage);
