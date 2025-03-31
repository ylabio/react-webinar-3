import React from 'react';
import PropTypes from 'prop-types';

import { plural } from '../../utils';
import Button from '../button';

import CartIcon from '../../assets/cart.svg';

import './style.css';

function Controls({ quantity, totalPrice, onOpen = () => {} }) {
  return (
    <div className="Controls">
      <Button onClick={onOpen} variant="outline" label="Открыть корзину">
        <CartIcon width={24} height={24} />
        {quantity > 0
          ? `${
              quantity +
              ' ' +
              plural(quantity, {
                one: 'товар',
                few: 'товара',
                many: 'товаров',
              }) +
              ' / ' +
              totalPrice.toLocaleString('ru-RU')
            } ₽`
          : 'Пусто'}
      </Button>
    </div>
  );
}

Controls.propTypes = {
  quantity: PropTypes.number,
  totalPrice: PropTypes.number,
  onOpen: PropTypes.func,
};

export default React.memo(Controls);
