import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from '../../utils';
import './style.css';

function Item(props) {

  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-price'>{formatPrice(props.item.price)} ₽</div>
      {props.item.count && <div className='Item-count'>{props.item.count} шт.</div>}
      <div className='Item-actions'>
        <button onClick={() => props.onAction(props.item.code, props.item.title, props.item.price)}>
          {props.buttonText}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAction: PropTypes.func,
  buttonText: PropTypes.string
};

Item.defaultProps = {
  basket: []
}

export default React.memo(Item);
