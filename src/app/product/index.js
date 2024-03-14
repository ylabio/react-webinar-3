import {memo, useCallback} from "react";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import ProductItem from "../../components/product-item";
import { languages } from '../../store/language/languages';

function Product() {

  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    product: state.catalog.product,
    lang: state.language.language
  }));

  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Получение товара от сервера с доп. полями
    getProduct: useCallback(id =>  store.actions.catalog.getProduct(id), [store]),
    // Получение товара от сервера по id
    getProductById: useCallback(id =>  store.actions.catalog.getProductById(id), [store]),
    // Изменение языка
    changeCurrentLanguage: useCallback(() => store.actions.language.changeCurrentLanguage(), [store]),
  }

  return (
    <PageLayout>
      <Head title={languages[select.lang].title} lang={select.lang} changeCurrentLanguage={callbacks.changeCurrentLanguage}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum} lang={select.lang}/>
      <ProductItem onAdd={callbacks.addToBasket} onClose={callbacks.closeModal}
                  product={select.product} getProduct={callbacks.getProduct}
                  getProductById={callbacks.getProductById} lang={select.lang}/>
    </PageLayout>
  );
}

export default memo(Product);
