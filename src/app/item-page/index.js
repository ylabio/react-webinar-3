import { memo, useCallback, useEffect, useState } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import { useParams } from 'react-router';
import BasketTool from '../../components/basket-tool';
import { cn as bem } from '@bem-react/classname';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Button from '../../components/button';
import './style.css';

const ItemPage = () => {
  const store = useStore();
  const { itemId } = useParams();

  const { item, loading, error } = useSelector(state => state.itemInfo);

  useEffect(() => {
    store.actions.itemInfo.loadItemById({ itemId });
  }, [store, itemId]);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    addToBasketFromItemPage: useCallback(_id => store.actions.basket.addToBasketFromItemPage(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  const cn = bem('ItemPage');

  return (
    <PageLayout>
      <Head title={item.title} />
      <div className={cn()}>
        <div className={cn('header')}>
          <a href="/">Главная</a>
          <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
        </div>
        <div className={cn('description')}>{item.description}</div>
        <div className={cn('main')}>
          <div className={cn('main-info')}>
            <span>Страна производитель:</span>
            <span>Категория:</span>
            <span>Год выпуска:</span>
          </div>
          <div className={cn('main-info', 'info-data')}>
            <div>{item.madeIn?.title}</div>
            <div>{item.category?.title}</div>
            <div>{item.edition}</div>
          </div>
        </div>
        <div className={cn('price')}>Цена: {item.price} ₽</div>
        <Button
          onClick={() => callbacks.addToBasketFromItemPage(item._id)}
          style={'primary'}
          title={'Добавить'}
        ></Button>
      </div>
    </PageLayout>
  );
};

export default memo(ItemPage);
