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
      <button onClick={props.openModal ?? (() => {})}>
        <CartIcon />
        <div>
          <b>
            {!!props.totalCartValue.uniqItems
              ? `${formatTotal(props.totalCartValue.uniqItems)} / ${formatNumber({ number: props.totalCartValue.price })}`
              : 'Пусто'}
          </b>
        </div>
      </button>
    </div>
  );
}

Controls.propTypes = {
  totalCartValue: PropTypes.shape({ uniqItems: PropTypes.number, price: PropTypes.number })
    .isRequired,
  openModal: PropTypes.func,
};

export default React.memo(Controls);
