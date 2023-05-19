import React from "react";
import './style.css';
import PropTypes from 'prop-types';
import CartList from '../cartList';

const Modal = (props) => {
  return (
    <div className={`Modal ${props.show ? 'active' : ''}`}>
      <div className='Modal-content'>
        <div className='Modal-header'>
          <h3 className='Modal-title'>Корзина</h3>
            {!props.hideCloseButton && <button onClick={() => props.setShow(false)} className='Modal-close'>Закрыть</button>}
        </div>
        <div className='Modal-container'>
        <div className='Modal-list'>
          <CartList cart={props.cart} onDelete={props.onDelete} />
        </div>
        <div className='Modal-amount'>
          <p className='Modal-text'>Итого</p>
          <p>{props.totalAmount} &#8381;</p>
        </div>
        </div>
        {props.children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    price: PropTypes.number
  })).isRequired,
  totalAmount: PropTypes.number,
};

Modal.defaultProps = {
  onDelete: () => {}
}

export default React.memo(Modal);
