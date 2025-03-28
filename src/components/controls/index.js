import React from 'react';
import PropTypes, { number } from 'prop-types';
import './style.css';
import { formatNumber, plural } from '../../utils';
import CartIcon from './images/cart.svg';

function Controls(props) {
  const formatTotal = number =>
    `${number} ${plural(number, { one: 'товар', few: 'товара', many: 'товаров', other: 'товаров' })}`;

  return (
    <div className="Controls">
      <button onClick={props.openModal}>
        <CartIcon />
        <div>
          <b>
            {!!props.totalItems ? 'Пусто' : formatTotal(props.totalItems)} /
            {formatNumber({ number: props.totalPrice })}
          </b>
        </div>
      </button>
    </div>
  );
}

Controls.propTypes = {
  totalItems: number,
  totalPrice: number,
  openModal: PropTypes.func,
};

Controls.defaultProps = {
  openModal: () => {},
};

export default React.memo(Controls);
