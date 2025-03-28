import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { plural } from '../../utils';
import {Basket} from '../basket'

function CartButton({
  totalItems = 0,
  totalSum = 0,
  onToggleCart = () => {}
}) {

  return (
    <div className="Cart">
      <button onClick={onToggleCart}>
        <Basket />
        {totalItems ? `${totalItems} ${plural(totalItems, {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })} / ${totalSum} ₽` : 'Пусто'}</button>
    </div>
  );
}

CartButton.PropTypes = {
  totalItems: PropTypes.number,
  totalSum: PropTypes.number,
  onToggleCart: PropTypes.func
};

export default React.memo(CartButton);
