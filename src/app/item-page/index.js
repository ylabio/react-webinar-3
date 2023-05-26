import React, { useCallback, useEffect, memo } from "react";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import PageLayout from "../../components/page-layout";
import ItemInfo from "../../components/item-info";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useParams } from "react-router";

function ItemPage() {
  const store = useStore();
  const { itemId } = useParams();

  useEffect(() => {
    store.actions.itemInfoStore.loadItem(itemId);
  }, [itemId]);

  const select = useSelector((state) => ({
    itemData: state.itemInfoStore.itemData,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title={select.itemData.title} />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <ItemInfo onAdd={callbacks.addToBasket} itemData={select.itemData} />
    </PageLayout>
  );
}

export default memo(ItemPage);
