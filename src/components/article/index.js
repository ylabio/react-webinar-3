import {memo, useCallback, useEffect} from 'react';
import {cn as bem} from '@bem-react/classname';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { numberFormat } from '../../utils';
import './style.css';

function Article({details, onAdd}) {
  const {_id, category, description, edition, madeIn, price } = details;

  const cn = bem('Article');
  const store = useStore();

  useEffect(() => {
    callbacks.closeModalBasket();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    listOfDetails: state.item.itemDetails,
  }));

  const callbacks = {
    onAdd: (e) => onAdd(_id),
    closeModalBasket: useCallback(() => store.actions.modals.close(),[store]),
  };

  return (
    <div className={cn()}>
      <div className={cn('info')}>
        <div className={cn('description')}>{description}</div>
        <div className={cn('country')}>
          <p className={cn('country-producer')}>Страна производитель:</p>
          <p className={cn('country-name')}>{madeIn?.title} ({madeIn?.code})</p>
        </div>
        <div className={cn('category')}>
          <p className={cn('category-itself')}>Категория:</p>
          <p className={cn('category-name')}>{category?.title}</p>
        </div>
        <div className={cn('year')}>
          <p className={cn('year-manufactured')}>Год выпуска:</p>
          <p className={cn('year-number')}>{edition}</p>
        </div>
        <div className={cn('actions')}>
          <div className={cn('price')}>Цена: {numberFormat(price)} ₽</div>
          <button onClick={callbacks.onAdd}>Добавить</button>
        </div>
      </div>
    </div>
  );
}

export default memo(Article);
