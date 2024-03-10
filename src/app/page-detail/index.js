import {memo, useCallback, useEffect} from 'react';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {useParams} from "react-router";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import PageLayout from "../../components/page-layout";
import ProductDetail from "../../components/product-detail";

function PageDetail() {

  const store = useStore();
  const {id} = useParams();



  useEffect(() => {
    store.actions.product.getDetailProduct(id);
  }, [id]);

  const select = useSelector(state => ({
    product : state.product.detail,
    amount: state.basket.amount,
    sum: state.basket.sum,
    isLoading: state.product.isLoading,
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  };


  return (
    <div >
      <PageLayout>
        <Head title={select.product?.title} />
        <BasketTool onOpen={() => store.actions.modals.open('basket')} amount={select.amount} sum={select.sum} />
        <ProductDetail product={ select?.product} addToCart={callbacks.addToBasket} />
      </PageLayout>
    </div>
  );
}

export default memo(PageDetail);
