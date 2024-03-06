import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { numberFormat } from "../../utils";

function OrderItem(props) {

  const cn = bem('OrderItem');

  const callbacks = {
    onClick: (e) => {
      e.stopPropagation();
      props.onClick(props.item);
    }
  }

  return (
    <div className={(cn())}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>{numberFormat(props.item.price)}</div>
      { !!props.item.count && <div className={cn('count')}>{props.item.count} шт</div> }
      <div className={cn('actions')}>
        <button className={cn('btn')} onClick={callbacks.onClick}>
          Удалить
        </button>
      </div>
    </div>
  );
}

OrderItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  onClick: PropTypes.func,
};

OrderItem.defaultProps = {
  onClick: () => {
  },
}

export default React.memo(OrderItem);
