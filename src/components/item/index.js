import React, { useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import { formatSum } from "../../utils";
import './style.css';

function Item(props) {

  const cn = bem('Item');

  const callbacks = {
    onAddItem: (e, item) => {
      e.stopPropagation();
      props.onAddItem(item.code);
    }
  }

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{formatSum(props.item.price, { style: 'currency', currency: 'RUB' })}</div>
        <button onClick={(e) => {callbacks.onAddItem(e, props.item)}}>
          Добавить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
  }).isRequired,
  onAddItem: PropTypes.func,
};

Item.defaultProps = {
  onAddItem: () => {
  }
}

export default React.memo(Item);
