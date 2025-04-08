import { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import ProductPage from '../../components/product-page';
import useTranslate from '../../hooks/useTranslate';

function ProductPageContainer() {
  const t = useTranslate();
  const store = useStore();
  const { itemId } = useParams();

  const select = useSelector(state => ({
    product: state.product.data,
    isLoading: state.product.isLoading,
    error: state.product.error,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  useEffect(() => {
    store.actions.product.loadProduct(itemId);
    return () => store.actions.product.reset();
  }, [itemId]);

  return (
    <ProductPage
      product={select.product}
      isLoading={select.isLoading}
      error={select.error}
      amount={select.amount}
      sum={select.sum}
      onAdd={callbacks.addToBasket}
      onOpenBasket={callbacks.openModalBasket}
      texts={t}
    />
  );
}

export default memo(ProductPageContainer);
