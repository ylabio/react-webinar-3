import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { plural, formatPrice } from '../../utils';

function Controls({onCartOpen, totalQuantity, totalPrice}) {
  const cn = bem('Controls');
  const variants = { one: 'товар', few: 'товара', many: 'товаров' };

  return (
    <div className={cn()}>
      <div className={cn('container')}>
        <p className={cn('data')}>В корзине:</p>
        <p className={[cn('data'), cn('data_strong')].join(' ')}>
          {
            totalQuantity ?
            `${totalQuantity} ${plural(totalQuantity, variants)} / ${formatPrice(totalPrice)}`:
            'пусто'
          }
        </p>
      </div>
      <button onClick={() => onCartOpen()} className={cn('button')}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onCartOpen: PropTypes.func,
  totalQuantity: PropTypes.number,
  totalPrice: PropTypes.number
};

Controls.defaultProps = {
  onCartOpen: () => {}
}

export default React.memo(Controls);
