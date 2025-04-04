import { useEffect, useCallback } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Nav from '../../components/nav';
import ProductInfo from '../../components/pruduct-info';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useParams } from 'react-router-dom';

function ProductPage() {
  const store = useStore();
  const { id } = useParams();

  const select = useSelector(state => ({
    product: state.product.product,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    loadProduct: useCallback(_id => store.actions.product.loadProduct(_id), [store]),
  };

  useEffect(() => {
    callbacks.loadProduct(id);
  }, [id, callbacks.loadProduct]);

  return (
    <PageLayout>
      {Object.keys(select.product).length > 0 && (
        <>
          <Head title={select.product.title} />
          <Nav />
          <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
          <ProductInfo product={select.product} onAdd={callbacks.addToBasket} />
        </>
      )}
    </PageLayout>
  );
}

export default ProductPage;
