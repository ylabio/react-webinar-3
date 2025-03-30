import React from 'react';
import Table from "../table";
import PropTypes from 'prop-types';

function Cart({ cart, onDeleteItem = () => {},  }) {
  const callbacks = {
    onDeleteItem: code => {
      onDeleteItem(code);
    }
  };

  //из-за того, что у списка в модальном окне есть свой "подвал" с итогами,
  //я склоняюсь использовать здесь таблицу, пусть она будет во многом похожа на List
  return (
    <>
      <header className="Cart-head">
        <h2>Корзина</h2>
      </header>
      <Table 
        cart={cart} 
        onDeleteItem={callbacks.onDeleteItem}
      />
    </>
  )
}

Cart.propTypes = {
  cart: PropTypes.shape({
    products: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.number,
        title: PropTypes.string,
        price: PropTypes.number,
        count: PropTypes.number,
      })
    ),
    fullPrice: PropTypes.number,
  }).isRequired,
  onDeleteItem: PropTypes.func,
};

export default React.memo(Cart);
