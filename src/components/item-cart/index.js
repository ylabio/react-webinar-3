import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {formatter} from '../../utils';

function ItemCart(props) {
  const cn = bem('Item');

  const callbacks = {
    onRemove: (e) => {
      e.stopPropagation();
      props.onRemoveItem(props.item.code);
    }
  }

  return (
    <div className={cn() + (props.item.selected ? ' Item_selected' : '')}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('actions')}>
        <p className={cn('price')}>{`${formatter(props.item.price)}`}</p>
        <p className={cn('count')}>{props.item.count} шт</p>
        <button onClick={(e) => callbacks.onRemove(e, props.item.code)}>Удалить</button>
      </div>
    </div>
  );
}

ItemCart.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
    price: PropTypes.number
  }).isRequired,
  onRemove: PropTypes.func,
};

ItemCart.defaultProps = {
  onRemove: () => { },
}

export default React.memo(ItemCart);
