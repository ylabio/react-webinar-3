import { memo, useCallback } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import HeaderTools from '../../components/header-tools';
import List from '../../components/list';
import PageTools from '../../components/page-tools';
import PropTypes from 'prop-types';

function Main({ openModalBasket, addToBasket, amount, sum, list }) {

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={addToBasket} />;
      },
      [addToBasket],
    ),
  };

  return (
    <PageLayout>
      <Head titleKey="title" />
      <HeaderTools
        handleOpen={openModalBasket}
        amount={amount}
        sum={sum}
      />
      <List list={list} renderItem={renders.item} />
      <PageTools />
    </PageLayout>
  );
}

Main.propTypes = {
  openModalBasket: PropTypes.func,
  addToBasket: PropTypes.func,
  amount: PropTypes.number,
  sum: PropTypes.number,
  list: PropTypes.array,
}

export default memo(Main);
