import React, {useState} from "react";
import PropTypes from "prop-types";
import './style.css';
import { cn as bem } from '@bem-react/classname';

function Item({item, onClick, btnTitle}){
  const cn = bem('Item')

  const callbacks = {
    onClick: () => {
      e.stopPropagation();
      onClick(item.code)
    },
  }

  return (
    <div className={cn()}>
      <div className={cn('code')}>{item.code}</div>
      <div className={cn('title')}>
        {item.title}
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>
          <span>{item.price}</span>
        </div>
        <button onClick={callbacks.onClick}>
          {btnTitle}
        </button>
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
  }).isRequired,
  onClick: PropTypes.func,
};

Item.defaultProps = {
  onClick: () => {},
}

export default React.memo(Item);
