import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import { numberWithSpaces } from "../../utils";
import './style.css';

function Item({ item, text, onItemClick }) {

  const cn = bem('Item');

  const callbacks = {
    onItemClick: () => {
      onItemClick(item);
    }
  }

  return (
    <div className={cn()}>
      <div className={cn('code')}>{item.code}</div>
      <div className={cn('title')}>
        {item.title}
      </div>
      <div className={cn('actions')}>
        <span className={cn('text')}>{numberWithSpaces(item.price)} ₽</span>
        {item.count &&
          <span className={cn('text')}>{item.count} шт</span>}
        <button onClick={callbacks.onItemClick}>
          {text}
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
    count: PropTypes.number
  }).isRequired,
  text: PropTypes.string,
  onItemClick: PropTypes.func
};

Item.defaultProps = {
  text: 'Кнопка',
  onItemClick: () => {
  }
}

export default Item;
