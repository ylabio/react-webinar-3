import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CartItem(props){
  const cn = bem('CartItem');

  const callbacks = {
    onRemove: (code) => {
      props.onRemove(code);
    }
  }

  return (
    <div className={cn()}>
      <div>
        <div className={cn('code')}>{props.item.code}</div>
        <div>{props.item.title}</div>
      </div>
      <div>
        <div className={cn('price')}>{`${props.item.price} ₽`}</div>
        <div className={cn('count')}>{`${props.item.count !== undefined ? props.item.count : '1'} шт`}</div>
        <button onClick={() => callbacks.onRemove(props.item.code)}>
          Удалить
        </button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number
  }).isRequired,
  onRemove: PropTypes.func,
};

CartItem.defaultProps = {
  onRemove: () => {},
}

export default React.memo(CartItem);
