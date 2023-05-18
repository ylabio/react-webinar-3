import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function Modal({basket, onAddItem}){
  return (
    <div className='List'>
      {basket.map(item =>
          <>
            <div className='Item-code'>
              {item.code}
            </div>
            <div className='Item-title'>
              {item.title}
            </div>
            <div className='Item-price'>
              {item.price} ₽
            </div>
            <div className='Item-price'>
              {item.quantity} ₽
            </div>
          </>
)}
    </div>
  )
}

Modal.propTypes = {
  basket: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number
  })).isRequired,
  // onAddItem: PropTypes.func,
};

Modal.defaultProps = {
  onAddItem: () => {},
}

export default React.memo(Modal);
