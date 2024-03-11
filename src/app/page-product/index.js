import { memo, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";

import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import NavBar from "../../components/nav-bar";
import Menu from "../../components/menu";
import BasketTool from "../../components/basket-tool";
import InfoProduct from "../../components/info-product";
import Loading from "../../components/loading";

function PageProduct() {
  const store = useStore();
  const location = useLocation();
  const pathname = location.pathname.split('/');
  const id = pathname[pathname.length - 1].slice(1);

  useEffect(() => {
    store.actions.product.loadProductInfo(id);
  }, [id]);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentProduct: state.product.currentProduct,
    isLoading: state.product.isLoading,
  }))

  const callbacks = {
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  }

  return (
    <PageLayout>
      <Head title={select.isLoading ? undefined : select.currentProduct.title} />
      <NavBar>
        <Menu />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </ NavBar>
      {!select.isLoading ?
        <InfoProduct
          currentProduct={select.currentProduct}
          addToBasket={callbacks.addToBasket} />
        :
        <Loading />
      }
    </ PageLayout>
  )
}

export default memo(PageProduct);
