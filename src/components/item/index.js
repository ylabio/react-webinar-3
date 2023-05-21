import React, {useState} from "react";
import PropTypes from "prop-types";
import './style.css';
import { getFormattedPrice } from "../../utils";

function Item({item, onCartAdd}){
  const callbacks = {
    onCartAdd: () => {
      onCartAdd(item.code);
    }
  }

  return (
    <div className={'Item'}>
      <div className='Item-code'>{item.code}</div>
      <div className='Item-title'>{item.title}</div>
      <div className='Item-price'>{getFormattedPrice(item.price)}</div>
      <div className='Item-actions'>
        <button onClick={() => callbacks.onCartAdd(item.code)}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onCartAdd: PropTypes.func,
};

Item.defaultProps = {
  onCartAdd: () => {},
}

export default React.memo(Item);
