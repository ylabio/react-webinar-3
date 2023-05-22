import React from "react";
import PropTypes from "prop-types";
import { thousSeparator } from "../../utils";
import './style.css';

function CartItem(props) {

  const callbacks = {
    handleControl: (e) => {
      e.stopPropagation();
      props.handleControl(props.item.code);
    }
  }

  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
        <span className='Item-price'>
          {thousSeparator(props.item.price * (props.item.count))}&nbsp;&#8381;
        </span>
      </div>
      <div className='Item-count'>
        {props.item.count}&nbsp;шт
      </div>      
      <div className='Item-actions'>
        <button onClick={callbacks.handleControl}>
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
    price: PropTypes.number
  }).isRequired,
  handleControl: PropTypes.func,
};

CartItem.defaultProps = {
  handleControl: () => {},
}

export default React.memo(CartItem);
