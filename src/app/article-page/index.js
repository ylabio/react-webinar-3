import React, { memo, useCallback, useEffect, useState } from 'react';
import './style.css';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import { useParams } from 'react-router-dom';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { numberFormat } from '../../utils';
import Button from '../../components/button';

const ArticlePage = () => {
  const { id } = useParams();
  const store = useStore();

  const select = useSelector(state => ({
    item: state.catalog.item,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  useEffect(() => {
    store.actions.catalog.loadById(id);
  }, [id, store]);

  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  };

  if (!select.item || Object.keys(select.item).length === 0) return null;

  return (
    <PageLayout>
      <Head title={select.item.title} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <div className="ArticlePage">
        <div className="ArticlePage-description">{select.item.description}</div>
        <table>
          <tbody>
            <tr className={'ArticlePage-row'}>
              <td>Страна производитель:</td>
              <th>{`${select.item.madeIn.title} (${select.item.madeIn.code})`}</th>
            </tr>
            <tr className={'ArticlePage-row'}>
              <td>Категория:</td>
              <th>{select.item.category.title}</th>
            </tr>
            <tr className={'ArticlePage-row'}>
              <td>Год выпуска:</td>
              <th>{select.item.edition}</th>
            </tr>
          </tbody>
        </table>
        <h2 className={'ArticlePage-price'}>Цена: {numberFormat(select.item.price)} ₽</h2>
        <Button style="primary" onClick={() => callbacks.addToBasket(id)} title="Добавить" />
      </div>
    </PageLayout>
  );
};

export default memo(ArticlePage);
