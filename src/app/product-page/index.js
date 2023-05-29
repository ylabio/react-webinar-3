import {memo, useCallback, useEffect} from 'react';
import PageLayout from "../../components/page-layout";
import {useParams} from "react-router-dom";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import ProductInfo from "../../components/product-info";
import HeaderLayout from "../../components/header-layout";
import Navigation from "../../components/navigation";

function ProductPage() {
  const {id} = useParams();

  const store = useStore();

  const select = useSelector(state => ({
    product: state.product.product,
    sum: state.basket.sum,
    amount: state.basket.amount
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  }

  useEffect(() => {
    store.actions.product.load(id);
  }, [id]);

  return (
    <PageLayout>
      <Head title={select.product?.title}/>
      <HeaderLayout>
        <Navigation/>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      </HeaderLayout>
      <ProductInfo product={select.product} onAdd={callbacks.addToBasket}/>
    </PageLayout>
  );
}

export default memo(ProductPage);
