import React from 'react';
import PropTypes from 'prop-types';
import { numberWithSpaces } from '../../utils';
import './style.css';

function Cartitem({
    onDeleteFromCart = () => {},
    title = '',
    count = 0,
    price = 0,
    code = 0,
}) {

  return (
    <div className='Cart-item' key={code}>
        <div className='Cart-item-title'>{title}</div>
        <div className='Cart-item-info'>
            <div className='Cart-item-count'>{count} шт</div>
            <div className='Cart-item-price'>{numberWithSpaces(price)} ₽</div>
        </div>
        <button className='Cart-item-delete' onClick={() => onDeleteFromCart(code)}>Удалить</button>
    </div>
  );
}

Cartitem.propTypes = {
    onDeleteFromCart: PropTypes.func,
  title: PropTypes.string,
  count: PropTypes.number,
  price: PropTypes.number,
  code: PropTypes.number,
};

export default Cartitem;