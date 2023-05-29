import { memo, useCallback, useEffect } from "react";
import { useProductById } from "../../hooks/getProductById";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import BasketTool from "../../components/basket-tool";
import ProductDescription from "../../components/product-description";
import Basket from "../basket";
import { NavigationMenu } from "../../components/navigation-menu";
import FlexContainer from "../../components/flex-container";

function ProductPage() {
  const store = useStore();
  const product = useProductById();
  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    modal: state.modals.name,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => {
        store.actions.basket.addToBasket(_id);
      },
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
  };

  useEffect(() => {
    if (product) store.actions.catalog.loadOne(product._id);
  }, [product]);
  // TODO loader
  return product ? (
    <>
      <PageLayout>
        <Head title={product.title} />
        <FlexContainer>
          <NavigationMenu />
          <BasketTool
            sum={select.sum}
            amount={select.amount}
            onOpen={callbacks.openModalBasket}
          />
        </FlexContainer>
        <ProductDescription
          product={product}
          onAddToBasket={callbacks.addToBasket}
        />
      </PageLayout>
      <>{select.modal === "basket" && <Basket />}</>
    </>
  ) : (
    <>Loader...</>
  );
}

export default memo(ProductPage);
