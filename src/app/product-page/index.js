import { memo, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';
import ProductInfo from '../../components/product-info';

function ProductPage() {
  const { id } = useParams();
  const store = useStore();

  useEffect(() => {
    if (id) {
      store.actions.product.load(id);
    }
  }, [id]);

  const callbacks = {
    addToBasket: useCallback(() => store.actions.basket.addToBasket(id), [store, id]),
  };

  const select = useSelector(state => ({
    product: state.product.data,
    loading: state.product.loading,
    error: state.product.error,
  }));

  if (select.loading) return <p>Загрузка...</p>;
  if (select.error) return <p>Ошибка: {select.error}</p>;
  if (!select.product) return <p>Товар не найден</p>;

  return <ProductInfo product={select.product} onAdd={callbacks.addToBasket} />;
}

export default memo(ProductPage);
