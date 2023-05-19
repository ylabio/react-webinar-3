import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {plural} from "../../utils";

function Controls({onModalOpen, cart}) {

  /** Получает итоговую сумму в корзине с учетом кол-ва товара
   * @returns {number}
   */
  const cartTotal = () => cart.reduce((sum, current) => parseInt(sum, 10) + (parseInt(current.count, 10) * parseInt(current.price, 10)), 0)

  return (
    <div className='Controls'>
      <p className='controls-title'>В корзине:<span
        className='controls-counter'>{cart.length > 0 ? `${cart.length} ${plural(cart.length, {
        one: 'товар',
        few: 'товара',
        many: 'товаров'
      })} / ${cartTotal()} ₽` : 'Пусто'}</span></p>
      <button onClick={() => onModalOpen()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onModalOpen: PropTypes.func,
  cart: PropTypes.array.isRequired
};

Controls.defaultProps = {
  onModalOpen: () => {
  }
}

export default React.memo(Controls);
