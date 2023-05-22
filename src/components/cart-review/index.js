import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import { plural, priceFormatter } from '../../utils';

function CartReview({ itemsQuantity, totalPrice, onCartOpen }) {
  const cn = bem('CartReview');
  const callbacks = {
    onCartOpen,
  };
  const getText = () => {
    const word = plural(itemsQuantity, {
      one: 'товар',
      few: 'товара',
      many: 'товаров',
    });
    const formattedTotalPrice = priceFormatter(totalPrice);

    return `${itemsQuantity} ${word} / ${formattedTotalPrice}`;
  };

  return (
    <div className={cn()}>
      <div className={cn('text')}>
        {'В корзине: '}
        <b>{itemsQuantity ? getText() : 'пусто'}</b>
      </div>
      <div className={cn('actions')}>
        <button onClick={() => callbacks.onCartOpen()}>Перейти</button>
      </div>
    </div>
  );
}

// items: PropTypes.arrayOf(
//   PropTypes.shape()),
//{
// //     price: PropTypes.number,
// //     quantity: PropTypes.number,
// //   }
// }

CartReview.propTypes = {
  itemsQuantity: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  onCartOpen: PropTypes.func.isRequired,
};

export default React.memo(CartReview);
