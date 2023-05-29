import {memo, useLayoutEffect, useCallback} from "react";
import {useParams} from "react-router-dom";
import PageLayout from "../../components/page-layout";
import Loader from "../../components/loader";
import Head from "../../components/head";
import ProductContent from "../../components/product-content";
import Navigation from "../../components/navigation";
import BasketTool from "../../components/basket-tool";
import Container from "../../components/container";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Product() {

  const store = useStore();
  let { id } = useParams();

  useLayoutEffect(() => {
    store.actions.product.load(id);
    // Очищаем store при демонтировании, чтобы при повторном открытии Product избежать мерцания старых данных
    return () => {
      store.actions.product.clean();
    };
  }, [store, id]);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    product: state.product.item,
    title: state.product.item?.title,
    loading: state.product.loading,
    lang: state.language.language,
  }));

  const callbacks = {
    // Открытие модального окна с корзиной
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Добавление товара в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),

    changeLanguage: useCallback((evt) => store.actions.language.setLanguage(evt.target.value), [store]),
  }

  return (
    <PageLayout>
      <Head title={select.title} lang={select.lang} onChange={callbacks.changeLanguage}/>
      <Container justify="spacebetween">
        <Navigation lang={select.lang}/>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} lang={select.lang}/>
      </Container>
      <Loader loading={select.loading}>
        <ProductContent product={select.product} onAdd={callbacks.addToBasket} lang={select.lang}/>
      </Loader>
    </PageLayout>
  );
}

export default memo(Product);
