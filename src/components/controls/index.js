import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import CartIcon from './icon';
import './style.css';
import { plural } from '../../utils';

function Controls({ totalUnicItems, totalPrice, onCartOpen }) {
  const cn = bem('Controls');
  const itemWord = plural(totalUnicItems, { one: 'товар', few: 'товара', many: 'товаров' });

  const cartText = totalUnicItems > 0
    ? `${totalUnicItems} ${itemWord} / ${totalPrice}`
    : 'Пусто';

  return (
    <div className={cn()}>
      <button className={cn('button')} onClick={onCartOpen}>
        <div className={cn('text')}><CartIcon/><b>{cartText}</b></div>
      </button>
    </div>
  );
}

Controls.propTypes = {
  totalUnicItems: PropTypes.number.isRequired,
  totalPrice: PropTypes.string.isRequired,
  onCartOpen: PropTypes.func.isRequired,
};

export default React.memo(Controls);
