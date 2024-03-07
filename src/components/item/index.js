import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import {formatPrice} from "../../utils";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    actionToItem : () => {
      props.onActionItem(props.item.code);
    }
  }

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>
        {formatPrice(props.item.price)}
      </div>
      {props.showCount && 
      <div className={cn('count')}>
        {props.item.count} шт
      </div>
      }
      <div className={cn('actions')}>
        <button 
          className={cn('button')}
          onClick={callbacks.actionToItem}
        >
          {props.actionBtnName}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number
  }).isRequired,
  showCount: PropTypes.bool,
  actionToItem: PropTypes.func.isRequired
};

Item.defaultProps = {
  actionToItem: () => {
  },
}

export default React.memo(Item);
