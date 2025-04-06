import { memo, useCallback } from 'react';

import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import HeaderTools from '../../components/header-tools';
import List from '../../components/list';
import PageTools from '../../components/page-tools';
import PropTypes from 'prop-types';

import { endpoints } from '../../config/endpoints';

function Main({ openModalBasket, addToBasket, onLinkClick, amount, sum, list }) {

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={addToBasket} url={endpoints.productPage} />;
      },
      [addToBasket],
    ),
  };

  return (
    <PageLayout>
      <Head titleKey="title" />
      <HeaderTools
        handleOpen={openModalBasket}
        handleLinkClick={onLinkClick}
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
  onLinkClick: PropTypes.func,
}

export default memo(Main);
