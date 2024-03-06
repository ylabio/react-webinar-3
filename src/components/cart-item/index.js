import React from "react";
import PropTypes from "prop-types";
import './style.css';
import { pluralCurrencies } from '../../utils'

function CartItem(props) {

  const callbacks = {
    onDelete: (e) => {
      e.stopPropagation();
      props.onDelete(props.item.code);
    }
  }

  if (!props.item.code) {
    return;
  }

  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-actions'>
        <p className={'Item-actions__price'}>{pluralCurrencies(props.item.price)}</p>
        {<p className={'Item-actions__count'}>{props.item.count} шт</p>}
        <button onClick={callbacks.onDelete}>
          {props.buttonText}
        </button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number
  }).isRequired,
  onDelete: PropTypes.func,
  buttonText: PropTypes.string
};

CartItem.defaultProps = {
  onDelete: () => {
  },
}

export default React.memo(CartItem);
