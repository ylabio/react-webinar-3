import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Basket from '../../assets/icons/basket.svg';
import { plural } from '../../utils';

function Controls({ basketList, showBasket=() => {} }) {
  let productsCount = 0;

  const onClick = () => {
    if (basketList.size === 0) {
      return
    } 

    showBasket();
  }

  const showBasketInfo = (basketList) => {
    if (basketList.size === 0) {
      return 'Пусто';
    } else {
      let sum = 0;
      basketList.forEach((value, key, map) => {
        sum += value.item.price * value.count;
        productsCount += value.count;
      });
      return `${productsCount} ${plural(productsCount)} / ${sum} ₽`
    }
  }

  return (
    <div className="Controls">
      <button onClick={onClick}><Basket className="icon" /> {showBasketInfo(basketList)}</button>
    </div>
  );
}

Controls.propTypes = {
  showBasket: PropTypes.func,
};

export default React.memo(Controls);
