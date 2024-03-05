import React from 'react';
import PropTypes from 'prop-types';
import { formatNumber } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ItemCart({ item, onActionType }) {
  const { price, code, title, quantity } = item;

  const formattedPriceNumber = formatNumber(price);

  const cn = bem('ItemCart');

  return (
    <div className={cn()}>
      <div className={cn('code')}>{code}</div>
      <div className={cn('title')}>{title}</div>
      <div className={cn('actions')}>
        <div className={cn('wrapper')}>
          <div className={cn('price')}>{formattedPriceNumber} ₽</div>
          {quantity && <span className={cn('quantity')}>{quantity} шт</span>}
        </div>
        <button onClick={() => onActionType(code)}>Удалить</button>
      </div>
    </div>
  );
}

ItemCart.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number
  }).isRequired,
  onActionType: PropTypes.func.isRequired
};

export default React.memo(ItemCart);
