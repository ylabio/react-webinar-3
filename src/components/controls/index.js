import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {plural} from "../../utils";

function Controls({onModalOpen, totalPrice, totalCount}) {

  return (
    <div className='Controls'>
      <p className='controls-title'>В корзине:<span
        className='controls-counter'>{totalCount > 0 ? `${totalCount} ${plural(totalCount, {
        one: 'товар',
        few: 'товара',
        many: 'товаров'
      })} / ${totalPrice.toLocaleString()} ₽` : 'пусто'}</span></p>
      <button onClick={() => onModalOpen()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onModalOpen: PropTypes.func,
  totalPrice: PropTypes.number,
  totalCount: PropTypes.number
};

Controls.defaultProps = {
  onModalOpen: () => {
  },
  totalPrice: 0,
  totalCount: 0
}

export default React.memo(Controls);
