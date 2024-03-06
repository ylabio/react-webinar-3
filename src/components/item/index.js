import React from "react";
import PropTypes from "prop-types";
import {formatPrice, plural} from "../../utils";
import './style.css';

function Item(props) {
  const callbacks = {
    addToCard: (e) => {
      e.stopPropagation();
      props.onClick(props.item.code);
    }
  }
  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className="Item-price-info">
      {`${formatPrice(props.item.price)} ₽`} 
      </div>
     { props.item?.quantity &&
      <div className="Item-quantity-info">
        { props.item.quantity} шт
      </div>
       }
      <div className='Item-actions'>
        <button onClick={callbacks.addToCard}>
          Добавить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onClick : PropTypes.func,
};

Item.defaultProps = {
  onClick: () => {
  },
}

export default React.memo(Item);
