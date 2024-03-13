import {memo, useCallback, useEffect, useState} from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ProductCard from "../../components/product-card";
import {useParams} from "react-router-dom";
import LoadWraper from "../../components/load-wraper";
import Menu from "../../components/menu";

function Product() {
  const [isLoading, setIsLoading] = useState(true);
  const {_Id} = useParams();
  const store = useStore();


  const select = useSelector(state => ({
    lang: state.lang,
    amount: state.basket.amount,
    sum: state.basket.sum,
    product: state.catalog.product,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    setCurrentPage: useCallback((pageNumber) => store.actions.catalog.setPage(pageNumber), [store]),
  }
  useEffect(() => {
    store.actions.catalog.loadItemById(_Id);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000)
  }, [_Id])


  return (
    <PageLayout>
      <Head title={select.product.map(el => el.title)}/>
      <Menu title={select.lang === 'ru-RU' ? 'Главная' : 'Main'}/>
      <BasketTool lang={select.lang} setCurrentPage={() => callbacks.setCurrentPage(1)}
                  onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <LoadWraper isLoading={isLoading} lang={select.lang}>
        <ProductCard lang={select.lang} addToBasket={callbacks.addToBasket} product={select.product}/>
      </LoadWraper>
    </PageLayout>

  );
}

export default memo(Product);
