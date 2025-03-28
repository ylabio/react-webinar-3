import React from 'react';
import Button from '../button';
import PropTypes from 'prop-types';
import { formatCurrency, plural } from '../../utils';
import Cart from '../../assets/cart.svg';

function CartButton({ itemCount = 0, totalCost = 0, ...props }) {
  const formattedCount =
    itemCount + ' ' + plural(itemCount, { one: 'товар', few: 'товара', many: 'товаров' });
  const formattedCost = formatCurrency(totalCost);
  const content = `${formattedCount} / ${formattedCost}`;
  return (
    <Button variant={'outline'} icon={<Cart fill={'var(--primary)'} />} {...props}>
      {itemCount > 0 ? content : 'Пусто'}
    </Button>
  );
}

CartButton.propTypes = {
  itemCount: PropTypes.number,
  totalCost: PropTypes.number,
};

export default CartButton;
