import {memo, useCallback} from "react";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import ProductItem from "../../components/product-item";

function Product() {

  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    product: state.catalog.product,
  }));

  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  }

  return (
    <PageLayout>
      <Head title='Название товара'/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <ProductItem onAdd={callbacks.addToBasket} onClose={callbacks.closeModal}
                  product={select.product}/>
    </PageLayout>
  );
}

export default memo(Product);
