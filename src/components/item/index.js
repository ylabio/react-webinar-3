import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import { markingPrice } from '../../utils';

function Item({ item, callbacks, theme = 'default' }) {
  const cn = bem('Item');
  const themeMode = {
    classNameBtn: theme === 'delete' ? 'delete' : 'add',
    text: theme === 'delete' ? 'Удалить' : 'Добавить',
    handleClick: theme === 'delete' ? callbacks.onRemFromBasket : callbacks.onAddToBasket,
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <b>{item.title}</b>
      </div>
      <div className={cn('info')}>
        {theme === 'delete' && <span className={cn('info__count')}>{`${item.count} шт`}</span>}
        <span className={cn('info__price')}>{`${markingPrice(item.price)} ₽`}</span>
      </div>
      <div className={cn('actions')}>
        <button
          className={`${cn('actions__button')} ${cn(`actions__button--${themeMode.classNameBtn}`)}`}
          onClick={() => themeMode.handleClick(item)}
        >
          {themeMode.text}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    count: PropTypes.number,
  }).isRequired,
  theme: PropTypes.oneOf(['delete', 'default']),
  callbacks: PropTypes.shape({
    onRemFromBasket: PropTypes.func,
    onAddToBasket: PropTypes.func,
  }).isRequired,
};

export default React.memo(Item);
