import Head from '../head';
import Controls from '../controls';
import List from '../list';
import React from 'react';
import PropTypes from 'prop-types';

function Products({ showModal, cnt, sum, list, action }) {
  return (
    <>
      <Head title="Магазин" />
      <Controls showModal={showModal} cnt={cnt} sum={sum} />
      <List list={list} action={action} actionTitle="Добавить" />
    </>
  );
}

Products.propTypes = {
  showModal: PropTypes.func,
  cnt: PropTypes.number,
  sum: PropTypes.number,
  list: PropTypes.array,
  action: PropTypes.func,
};

Products.defaultProps = {
  showModal: () => {},
  action: () => {},
};

export default React.memo(Products);
