import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Item(props) {
  const cn = bem('Item');
  return (
    <article className={cn()}>
      <div className={cn('textBlock')}>
        <h2 className={cn('title')}>{props.item.title}</h2>
        <p className={cn('price')}>{props.item.price} ₽</p>
      </div>
      <div className={cn('actions')}>
        <button className={cn('button')} onClick={props.onClick}>
          Добавить
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
  onClick: PropTypes.func.isRequired,
};

export default React.memo(Item);
