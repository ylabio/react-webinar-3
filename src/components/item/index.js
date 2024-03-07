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
      <div className='Item-actions'>
        <button className="Item-button" onClick={() => props.onAction(props.item.code)}>
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
    price: PropTypes.number
  }).isRequired,
  onAction: PropTypes.func,
};

Item.defaultProps = {
  basket: []
}

export default React.memo(Item);
