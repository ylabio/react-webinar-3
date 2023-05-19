import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {plural} from '../../utils';

function Controls(props){
  return (
    <div className='Controls'>
      <div className='Controls-container'>
        <p className='Controls-text'>В корзине:</p>
        <p className='Controls-text_bold'>
          {props.cart.length !== 0 ? `${props.totalCount} ${plural(props.totalCount, {one: 'товар', few: 'товара', many: 'товаров'})} / ${(props.totalAmount + ' ₽')}` 
          : 
           'пусто'}
        </p>
      </div>
      <button className='Controls-btn' onClick={props.onClick}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired),
  totalAmount: PropTypes.number,
  totalCount: PropTypes.number
};

export default React.memo(Controls);
