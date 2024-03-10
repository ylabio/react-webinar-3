import { useParams } from "react-router-dom";
import useStore from "../../store/use-store";
import { memo, useCallback, useEffect } from "react";
import useSelector from "../../store/use-selector";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import ItemProduct from "../../components/item-product";
import Loader from "../../components/loader";
import Error from "../../components/error";

function Product() {

  const store = useStore();
  const params = useParams()

  useEffect(() => {
    store.actions.product.getProduct(params.id)
  }, [params.id]);

  const select = useSelector(state => ({
    product: state.product.data,
    isLoading: state.product.isLoading,
    isError: state.product.isError,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language.currentLanguage
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    toggleLanguage: useCallback(() => store.actions.language.toggleLanguage(), [store])
  }

  return (
    <PageLayout>
      <Head title={select.product?.title}/>
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        language={select.language}/>
      <Loader isLoading={select.isLoading} language={select.language}>
        <Error isError={select.isError} language={select.language}>
          <ItemProduct
            product={select.product}
            addToBasket={callbacks.addToBasket}
            language={select.language}/>
        </Error>
      </Loader>
    </PageLayout>
  );
}

export default memo(Product);
