import React from 'react';
import PropTypes from 'prop-types';
import Table from '../table';
import './style.css';

function ModalWindow(props) {
  const callbacks = {
    onDeleteItem: code => {
      props.onDeleteItem(code);
    }
  };

  return (
    <div className="ModalWindow">
      <div className="ModalWindow-head">
        <h2>Корзина</h2>
        <button 
          className="ModalWindow-close" 
          onClick={() => props.onModalStateChange()}
        />
      </div>
      <Table 
        cart={props.cart} 
        sum={props.sum}
        onDeleteItem={callbacks.onDeleteItem}
      />
    </div>
  );
}

ModalWindow.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  sum: PropTypes.number,
  onModalStateChange: PropTypes.func,
};

ModalWindow.defaultProps = {
  onModalStateChange: () => {},
};

export default React.memo(ModalWindow);
