import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function Item({ item, buttonTitle, onClick }) {
  const cn = bem('Item');
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
      <div className={cn('price')}>{price} ₽</div>
      {count && <div className={cn('count')}>{count} шт</div>}
      <div className={cn('actions')}>
        <button onClick={callbacks.onClick}>{buttonTitle}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }),
  onClick: PropTypes.func,
  buttonTitle: PropTypes.string,
};

export default React.memo(Item);
