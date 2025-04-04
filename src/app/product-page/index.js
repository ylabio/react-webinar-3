import { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import PageLayout from '../../components/page-layout';
import ProductDetails from '../../components/product-details';

const ProductPage = () => {
  const store = useStore();
  const { itemId } = useParams();

  const select = useSelector(state => ({
    item: state.catalog.selectedItem,
    amount: state.basket.amount,
    sum: state.basket.sum,
    isLoading: state.catalog.isLoading,
    error: state.catalog.error,
  }));

  useEffect(() => {
    store.actions.catalog.getItemById(itemId);

    return () => {
      store.actions.catalog.resetSelectedItem();
    };
  }, [itemId, store]);

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  return (
    <PageLayout>
      <Head title={select.item?.title || 'Товар'} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />

      {select.isLoading ? (
        <div>Загружаем информацию о товаре...</div>
      ) : select.error ? (
        <div>
          <h3>Произошла ошибка</h3>
          <p>{select.error}</p>
        </div>
      ) : select.item ? (
        <ProductDetails item={select.item} onAdd={callbacks.addToBasket} />
      ) : (
        <div>Товар не найден</div>
      )}
    </PageLayout>
  );
};

export default memo(ProductPage);
