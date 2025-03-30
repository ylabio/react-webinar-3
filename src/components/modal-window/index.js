import React from 'react';
import PropTypes from 'prop-types';
import Table from '../table';
import './style.css';

function ModalWindow({ cart, onDeleteItem = () => {}, onModalStateChange = () => {} }) {
  const callbacks = {
    onDeleteItem: code => {
      onDeleteItem(code);
    }
  };

  //из-за того, что у списка в модальном окне есть свой "подвал" с итогами,
  //я склоняюсь использовать здесь таблицу, пусть она будет во многом похожа на List
  return (
    <div className="ModalWindow">
      <div className="ModalWindow-head">
        <h2>Корзина</h2>
        <button 
          className="ModalWindow-close" 
          onClick={() => onModalStateChange()}
        />
      </div>
      <Table 
        cart={cart} 
        onDeleteItem={callbacks.onDeleteItem}
      />
    </div>
  );
}

ModalWindow.propTypes = {
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
  onModalStateChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
};

export default React.memo(ModalWindow);
