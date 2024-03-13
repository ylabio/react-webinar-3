import React, { useCallback, useEffect } from "react";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import Navbar from "../../components/navbar";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ItemCard from "../../components/item-card";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader";

function ItemInfo() {
  const { itemId } = useParams();

  const store = useStore();

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.catalog.currentProduct,
    productIsLoading: state.catalog.productIsLoading,
  }));

  useEffect(() => {
    store.actions.catalog.loadFullProductData(itemId);

    return () => {
      store.actions.catalog.setProductIsLoading();
    };
  }, [itemId]);

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
    <>
      {!select.productIsLoading ? (
        <PageLayout>
          <Head title={select.item.title} />
          <Navbar navList={[{ name: "Главная", path: "/" }]}>
            <BasketTool
              onOpen={callbacks.openModalBasket}
              amount={select.amount}
              sum={select.sum}
            />
          </Navbar>
          <ItemCard item={select.item} onAdd={callbacks.addToBasket} />
        </PageLayout>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default React.memo(ItemInfo);
