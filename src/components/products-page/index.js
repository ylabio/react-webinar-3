import Head from '../head';
import Controls from '../controls';
import List from '../list';
import React from 'react';
import PropTypes from 'prop-types';

function ProductsPage({ showModal, cnt, sum, list, action }) {
  return (
    <>
      <Head title="Магазин" />
      <Controls showModal={showModal} cnt={cnt} sum={sum} />
      <List list={list} action={action} actionTitle="Добавить" />
    </>
  );
}

ProductsPage.propTypes = {
  showModal: PropTypes.func,
  cnt: PropTypes.number,
  sum: PropTypes.number,
  list: PropTypes.array,
  action: PropTypes.func,
};

ProductsPage.defaultProps = {
  showModal: () => {},
  action: () => {},
};

export default React.memo(ProductsPage);
