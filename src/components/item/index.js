import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const { item, onClick, buttonText, quantity } = props;
  return (
    <article className={cn()}>
      <h2 className={cn('title')}>{item.title}</h2>
      <div className={cn('textBlock', { spacing: quantity === 0 })}>
        {quantity > 0 && <p className={cn('text')}>{quantity} шт.</p>}
        <p className={cn('price')}>{item.price} ₽</p>
      </div>
      <div className={cn('actions')}>
        <button
          className={buttonText === 'Добавить' ? cn('button') : cn('button_delete')}
          onClick={onClick}
        >
          {buttonText}
        </button>
      </div>
    </article>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  buttonText: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default React.memo(Item);
