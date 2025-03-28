import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import  cartIcon from '../../img/cart.svg';
import { plural } from '../../utils';


function Controls({controlsHandler = () => {}, count  = 0, totalPrice = 0}) {
  return (
    <div className="Controls">
      <button onClick={() => onAdd()}>
      <img src={cartIcon} alt="cartIcon" className='cartIcon' />
      {count ? ` ${count } ${plural(count, {
              one: 'товар',
              few: 'товара',
              many: 'товаров'
            })}`
            : 'Пусто'}
      {totalPrice ? ` / ${totalPrice.toLocaleString('ru-RU')} ₽` : ''}
      </button>
    </div>
  );
}

Controls.propTypes = {
   controlsHandler: PropTypes.func,
   count: PropTypes.number,
   totalPrice: PropTypes.number,
};

export default React.memo(Controls);
