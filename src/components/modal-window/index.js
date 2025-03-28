import React from 'react';
import PropTypes from 'prop-types';
import Table from '../table';
import './style.css';

function ModalWindow({ cart, sum, onDeleteItem = () => {}, onModalStateChange = () => {} }) {
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
        sum={sum}
        onDeleteItem={callbacks.onDeleteItem}
      />
    </div>
  );
}

ModalWindow.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      count: PropTypes.number,
    }),
  ).isRequired,
  sum: PropTypes.number,
  onModalStateChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
};

export default React.memo(ModalWindow);
