import {memo, useCallback} from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

import ProductCard from "../../components/product-card";
import {useParams} from "react-router-dom";

function Product() {
  const {_Id} = useParams();
  const store = useStore();


  const select = useSelector(state => ({
    list: state.catalog.product,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const product = select.list.filter(el => el._id === _Id)

  console.log(product)

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    setCurrentPage: useCallback((pageNumber) => store.actions.catalog.setPage(pageNumber), [store]),
  }


  return (
    <PageLayout>
      <Head title={product[0].title}/>
      <BasketTool setCurrentPage={()=>callbacks.setCurrentPage(1)} onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <ProductCard addToBasket={callbacks.addToBasket} product={product[0]}/>
    </PageLayout>

  );
}

export default memo(Product);
