import { memo, useCallback, useEffect, useState } from "react";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import { useParams } from "react-router-dom";
import CardItem from "../../components/card-item";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Card() {
  const store = useStore();
  const { id } = useParams();
  const [item, setItem] = useState({});

  useEffect(() => {
    store.actions.card.dataCard({ setItem, id });
  }, [id]);

  const select = useSelector((state) => ({
    list: state.card.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      () => store.actions.basket.addToBasket(id, "card"),
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
      <Head title={item?.title} />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <CardItem item={item} onAdd={callbacks.addToBasket} />
    </PageLayout>
  );
}

export default memo(Card);
