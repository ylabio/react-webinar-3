import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import { priceFormat } from '../../utils';

function CartItem({ item, buttonTitle, onClick }) {
  const cn = bem('CartItem');
  const { code, title, price, count } = item;

  const callbacks = {
    onClick: (e) => {
      e.stopPropagation();
      onClick(code);
    },
  };

  return (
    <div className={cn()}>
      <div className={cn('code')}>{code}</div>
      <div className={cn('title')}>{title}</div>
      <div className={cn('price')}>{priceFormat(price)}</div>
      <div className={cn('count')}>{count} шт</div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onClick}>{buttonTitle}</button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func,
  buttonTitle: PropTypes.string,
};

export default React.memo(CartItem);
