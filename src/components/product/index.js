import { memo, useCallback, useEffect, useState } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Basket from '../../app/basket';
import { Link, useParams } from 'react-router-dom';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import Button from '../button';
import {numberFormat} from '../../utils';

function Product() {
  const store = useStore();
  const activeModal = useSelector(state => state.modals.name);
  const cn = bem('Product');

  const params = useParams();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    article: state.catalog.article,
    lang: state.catalog.lang,
  }));

  useEffect(() => {
    store.actions.catalog.loadId(params.id);
  }, [params, select.lang]);


  console.log(select);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket],
    ),
  };

  return (
    <>
      <PageLayout>
        <Head title={select.article.title} />
        <div className={cn('menu')}>
          <Link className={cn('link')} to={`/`}>
            Главная
          </Link>
          <BasketTool
            onOpen={callbacks.openModalBasket}
            amount={select.amount}
            sum={select.sum}
          />
        </div>
        <section className={cn()}>

          <p className={cn('description')}>{select.article.description}</p>
          <div className={cn('madeIn')}>
            <div>
              <p className={cn('category-info')}>Страна производитель:</p>
              <p className={cn('category-info')}>Категория:</p>
              <p className={cn('category-info')}>Год выпуска:</p>
            </div>
            <div>
              <p className={cn('category-bold')}>{select.article.madeIn?._type}</p>
              <p className={cn('category-bold')}>{select.article.category?._type}</p>
              <p className={cn('category-bold')}>{select.article.edition}</p>
            </div>
          </div>
          <p className={cn('price')}>Цена: {numberFormat(select.article.price)} ₽</p>
          <Button style="primary" onClick={() => callbacks.addToBasket(params.id)} title="Добавить" />
        </section>
      </PageLayout>
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default memo(Product);
