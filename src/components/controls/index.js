import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Basket from '../../assets/icons/basket.svg';
import { plural } from '../../utils';

function Controls({ controlsInfo, showBasket=() => {} }) {

  const onClick = () => {
    if (controlsInfo.amount === 0) {
      return
    } 

    showBasket();
  }

  const showBasketInfo = () => {
    if (controlsInfo.amount === 0) {
      return 'Пусто';
    } else {
      return `${controlsInfo.amount} ${plural(controlsInfo.amount)} / ${controlsInfo.totalPrice.toLocaleString()} ₽`
    }
  }

  return (
    <div className="Controls">
      <button onClick={onClick}><Basket className="icon" /> {showBasketInfo()}</button>
    </div>
  );
}

Controls.propTypes = {
  showBasket: PropTypes.func,
};

export default React.memo(Controls);
