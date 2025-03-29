import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Controls from '../controls';
import { cn as bem } from '@bem-react/classname';
import { formatPrice } from '../../utils';

function Item( {item,
  onAddItemtoCart = () => {},
}) {

  const price = formatPrice(item.price);

  const callbacks = {
    onAddItemtoCart: e => {
      e.stopPropagation();
      onAddItemtoCart(item.code);
    },
  };

  const cn = bem("Item");

  return (
    <div
      className={cn()}
      onClick={callbacks.onClick}
    >
      <div className={cn("title")}>
        <b>{item.title}</b>
      </div>
      <div>
        <p>{price}</p>
      </div>
      <div className={cn("actions")}>
        <Controls  handleClick={callbacks.onAddItemtoCart} styles={cn("controls" )}title="Добавить"/>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onAddItemtoCart: PropTypes.func,
};

export default React.memo(Item);
