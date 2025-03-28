import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import cart from '../../assets/cart.svg';
import './style.css';

function Controls({ onOpen = () => {}, item }) {
  return (
    <div className="Controls">
      <button className="Controls-wrap" onClick={() => onOpen()}>
        <img className="Controls-wrap-img" src={cart}></img>
        <div className="Controls-wrap-text">
          {item.amount
            ? `${item.amount} ${plural(item.amount, {
                one: 'товар',
                few: 'товара',
                many: 'товаров',
              })} / ${item.cash.toLocaleString('ru-RU')} ₽`
            : 'Пусто'}
        </div>
      </button>
    </div>
  );
}

Controls.propTypes = {
  onOpen: PropTypes.func,
};

export default React.memo(Controls);
