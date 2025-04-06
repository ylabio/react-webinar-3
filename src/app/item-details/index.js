import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import Button from '../../components/button';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PageLayout from '../../components/page-layout';
import './style.css';

function ItemDetails() {
  const cn = bem('ItemDetails');
  const { id } = useParams();
  const store = useStore();
  const [item, setItem] = useState(null);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  useEffect(() => {
    async function fetchItem() {
      try {
        const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
        const json = await response.json();
        setItem(json.result);
      } catch (error) {
        console.error('Ошибка загрузки товара:', error);
      }
    }
    fetchItem();
  }, [id]);

  const callbacks = {
    addToBasket: () => store.actions.basket.addToBasket(id),
    openModalBasket: () => store.actions.modals.open('basket'),
  };

  if (!item) return <div>Загрузка...</div>;

  const content = (
    <div className={cn('content')}>
      <p className={cn('description')}>
        {item.description}
      </p>
      <div className={cn('details')}>
        <p>
          <span className={cn('label')}>Страна производитель:</span>{' '}
          <span className={cn('highlight')}>
            {item.madeIn.title} ({item.madeIn.code})
          </span>
        </p>
        <p>
          <span className={cn('label')}>Категория:</span>{' '}
          <span className={cn('highlight')}>{item.category.title}</span>
        </p>
        <p>
          <span className={cn('label')}>Год выпуска:</span>{' '}
          <span className={cn('highlight')}>{item.edition}</span>
        </p>
        <p className={cn('highlight')}>Цена: {numberFormat(item.price)} ₽</p>
      </div>
      <Button style="primary" onClick={callbacks.addToBasket} title="Добавить" />
    </div>
  );

  return (
    <PageLayout
      head={
        <>
          <Head title={item.title} />
          <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
        </>
      }
      children={content}
    />
  );
}

export default ItemDetails;
