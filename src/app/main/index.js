import { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import { langText } from '../../constants/language';
import { useParams } from 'react-router-dom';

function Main({ language = 'ru' }) {
  const store = useStore();
  const { page } = useParams();

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  useEffect(() => {
    store.actions.catalog.load(10, Number(page), language);
  }, [page, store.actions.catalog, language]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      _id => store.actions.basket.addToBasket(_id),
      [store],
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open('basket'),
      [store],
    ),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} language={language}/>;
      },
      [callbacks.addToBasket, language],
    ),
  };

  return (
    <PageLayout>
      <Head title={langText.SHOP[language]} />
      <p>{}</p>
      <BasketTool
        language={language}
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        limit={10}
        count={select.count}
        currentPage={Number(page || 1)}
      />
    </PageLayout>
  );
}

Main.propTypes = {
  language: PropTypes.string,
};

export default memo(Main);
