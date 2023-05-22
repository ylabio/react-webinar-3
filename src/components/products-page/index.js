import Head from '../head';
import Controls from '../controls';
import List from '../list';
import React from 'react';
import PropTypes from 'prop-types';
import ItemProduct from '../item';

function ProductsPage({ showModal, cnt, sum, list, addItem }) {
  return (
    <>
      <Head title="Магазин" />
      <Controls showModal={showModal} cnt={cnt} sum={sum} />
      <List
        render={(item) => (
          <ItemProduct
            key={item.code}
            code={item.code}
            title={item.title}
            price={item.price}
            addItem={addItem}
          />
        )}
        list={list}
      />
    </>
  );
}

ProductsPage.propTypes = {
  cnt: PropTypes.number,
  sum: PropTypes.number,
  list: PropTypes.array,
  showModal: PropTypes.func,
  addItem: PropTypes.func,
};

ProductsPage.defaultProps = {
  showModal: () => {},
  addItem: () => {},
};

export default React.memo(ProductsPage);
