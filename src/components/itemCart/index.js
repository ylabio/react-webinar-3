import React from "react";
import PropTypes from "prop-types";
import {getNumberFormat} from "../../utils";
import './style.css';

function ItemCart(props){

  const callbacks = {
    onDelete: (e) => {
      e.stopPropagation();
      props.onDeleteItem(props.item.code);
    },
  }
  return (
    <div className='ItemCart'>
      <div className='ItemCart-code'>{props.item.code}</div>
      <div className='ItemCart-title'>
        {props.item.title}
      </div>
      <div className='ItemCart-price'>
        {`${getNumberFormat(props.item.price)}`}&nbsp;₽
      </div>
      <div className='ItemCart-count'>
        {`${props.item.count}`}&nbsp;шт
      </div>
      <div className='ItemCart-actions'>
        <button onClick={callbacks.onDelete}>Удалить</button>
      </div>
    </div>
  );
}

ItemCart.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  onDelete: PropTypes.func,
};

ItemCart.defaultProps = {
  onDelete: () => {},
}

export default React.memo(ItemCart);
