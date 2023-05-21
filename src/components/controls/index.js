import React from 'react';
import { plural, priceFormat } from '../../utils';
import './style.css';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

function Controls({ openModal, count, sum }) {
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('cart')}>
        В корзине:
        <span className={cn('data')}>
          {count > 0
            ? ` ${count} ${plural(count, {
                one: 'товар',
                few: 'товара',
                many: 'товаров',
              })} 
         / ${priceFormat(sum)}`
            : 'пусто'}
        </span>
      </div>
      <button className={cn('actions')} onClick={openModal}>
        Перейти
      </button>
    </div>
  );
}

Controls.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      count: PropTypes.number,
    }).isRequired
  ),
  onDeleteCartItem: PropTypes.func,
};

export default React.memo(Controls);
