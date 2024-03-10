import { memo, useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../store/use-store";
import Head from "../../components/head";
import useSelector from "../../store/use-selector";
import PageLayout from "../../components/page-layout";
import ProductInfo from "../../components/product-info";
import Controls from "../../components/controls";
import LoadingSpinner from "../../components/loading-spinner";

function ProductPage() {
  const { productId } = useParams();
  const store = useStore();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const loadProduct = async () => {
      await store.actions.item.load(productId);
      setProduct(store.getState().item.info);
    } 
    loadProduct();
  }, [productId, store]);
  
  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  }

  if (!product) {
    return <LoadingSpinner />
  }

  return (
    <PageLayout>
      <Head title={product.title}/>
      <Controls onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <ProductInfo product={product} onAdd={callbacks.addToBasket} />
    </PageLayout>
  );
}

export default memo(ProductPage);
