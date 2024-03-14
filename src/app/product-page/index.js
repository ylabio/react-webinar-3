import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Head from "../../components/head";
import { useParams } from "react-router-dom";
import { useCallback, useEffect } from "react";
import BasketTool from "../../components/basket-tool";
import PageLayout from "../../components/page-layout";
import { ProductData } from "../../components/product-data";
import Basket from "../basket";
import { NavToolWrap } from "../../components/nav-tool-wrap";
import { NavBar } from "../../components/nav-bar";
import { links } from "../../constants";

export function ProductPage() {
  const store = useStore();

  const params = useParams();

  useEffect(() => {
    if (params.productId) store.actions.product.load(params.productId);
  }, [params]);

  const select = useSelector((state) => ({
    product: state.product.item,
    error: state.product.error,
    productsCount: state.catalog.productsCount,
    amount: state.basket.amount,
    sum: state.basket.sum,
    activeModal: state.modals.name,
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
    <>
      {select.product.title && select.error === "none" ? (
        <PageLayout>
          <Head title={select.product.title} />
          <NavToolWrap>
            <NavBar links={links} />
            <BasketTool
              onOpen={callbacks.openModalBasket}
              amount={select.amount}
              sum={select.sum}
            />
          </NavToolWrap>
          <ProductData item={select.product} onAdd={callbacks.addToBasket} />
        </PageLayout>
      ) : (
        <p>loading</p>
      )}

      {select.activeModal === "basket" && <Basket />}
    </>
  );
}
