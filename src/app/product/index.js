import { memo, useCallback, useEffect } from "react";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Details from "../../components/details";
import { useParams } from "react-router-dom";
import Navigation from "../../components/navigation";
import Menu from "../../components/menu";

function Product() {
  const store = useStore();
  const { productId } = useParams();

  useEffect(() => {
    store.actions.productDetails.load(productId);
  }, [store]);

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    product: state.productDetails.result,
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
      <Head title={select.product.title} />
      <Navigation>
        <Menu />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </Navigation>
      <Details product={select.product} addToBasket={callbacks.addToBasket} />
    </PageLayout>
  );
}

export default memo(Product);
