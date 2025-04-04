import { memo, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import useSelector from '../../store/use-selector';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import useStore from '../../store/use-store';

function ProductPage() {
  const cn = bem('Product');
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

  return (
    <div className={cn()}>
      <p className={cn('description')}>{select.product.description}</p>
      <div className={cn('info')}>
        <div className={cn('info-label')}>Страна производитель:</div>
        <div className={cn('info-value')}>
          <b>
            {select.product.madeIn.title} ({select.product.madeIn.code})
          </b>
        </div>

        <div className={cn('info-label')}>Категория:</div>
        <div className={cn('info-value')}>
          <b>
            <b>{select.product.category.title}</b>
          </b>
        </div>

        <div className={cn('info-label')}>Год выпуска:</div>
        <div className={cn('info-value')}>
          <b>
            <b>{select.product.edition}</b>
          </b>
        </div>
      </div>
      <p className={cn('price')}>Цена: {select.product.price}₽</p>
      <div className={cn('add-wrap')}>
        <button className={cn('add-button')} onClick={callbacks.addToBasket}>
          Добавить
        </button>
      </div>
    </div>
  );
}

export default memo(ProductPage);
