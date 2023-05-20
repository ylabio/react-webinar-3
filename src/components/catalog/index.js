import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import Controls from '../controls';
import Head from '../head';
import Item from '../item';
import PageLayout from '../layouts/page-layout';
import List from '../list';

/**
 * Каталог (главная страница с товарами), чтоб малость разгрузить app.js
 */

function Catalog({ list, onAddToBasket, onBasketShow, info }) {

  // Специфичный итем для каталога
  const catalogItem = useCallback(item => <Item
    item={item} onAction={onAddToBasket} actionName="Добавить"
  />, []);

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls onBasketClick={onBasketShow} basketInfo={info} />
      <List list={list} render={catalogItem} />
    </PageLayout>
  );
}

Catalog.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onAddToBasket: PropTypes.func.isRequired,
  onBasketShow: PropTypes.func.isRequired,
  info: PropTypes.object
}

Catalog.defaultProps = {
  list: [],
  onAddToBasket: () => { },
  onBasketShow: () => { },
  info: { goods: 0, price: 0 }
}

export default React.memo(Catalog);