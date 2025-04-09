import { memo, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Basket from "../basket";
import useSelector from "../../store/use-selector";
import Loader from "../../components/loader";
import ProductInfo from "../../components/product-info";
import useStore from "../../store/use-store";
import Button from "../../components/button";
import MainMenu from "../../components/main-menu";

function Product() {
  const store = useStore();

  const { id } = useParams();
  const activeModal = useSelector(state => state.modals.name);

  const select = useSelector( state => ({
    product: state.product.data,
    isLoading: state.product.isLoading,
  }));


  useEffect(() => {
      store.actions.product.load(id);
  }, [id]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(id => store.actions.basket.addToBasket(id), [store]),
    openModal: useCallback(() => store.actions.modals.open('basket'), [store]),
  }


  return (
    <PageLayout>
      {select.isLoading
        ? <Loader />
        : <>
          <Head title={select.product.title}/>
          <MainMenu />

          <ProductInfo product={select.product} />
          <Button style="primary" title="Добавить" onClick={() => callbacks.addToBasket(id)}/>
          {activeModal === 'basket' && <Basket/>}
        </>
      }
    </PageLayout>
  )
}

export default memo(Product);
