import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { formatNumber } from "../../utils";

function Cart({list, totalPrice, onModalClose, onRemoveFromCard}){

  const onDeleteItemHandler = (code) => () => {
    onRemoveFromCard(code);
  }

  return (
    <div className='Cart'>
      <div className='Cart__header'>
        <h2 className='Cart__title'>Корзина</h2>
        <button className='Cart__button' onClick={onModalClose}>Закрыть</button>
      </div>
      <div className='Cart-list'>
        {list.map(({code, title, price, count}) => (
          <div key={code} className='Cart-item'>

            <div className='Cart-item__block_left'>
              <span>{code}</span>
              <span>{title}</span>
            </div>

            <div className='Cart-item__block_content'>
              <span>{formatNumber(price, { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 })}</span>
              <span>{`${count} шт`}</span>
            </div>

            <div className='Cart-item__block_right'>
              <button className='Cart-item__button' onClick={onDeleteItemHandler(code)}>Удалить</button>
            </div>
          </div>
        ))}
        <div className='Cart-list__total-count'>
          <strong>Итого</strong>
          <strong>{formatNumber(totalPrice, { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 })}</strong>
        </div>
      </div>
    </div>
  )
}

Cart.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  })).isRequired,
  totalPrice: PropTypes.number,
  onModalClose: PropTypes.func,
  onRemoveFromCard: PropTypes.func,
};

export default React.memo(Cart);
