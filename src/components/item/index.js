import React, {useState} from "react";
import PropTypes from "prop-types";
import {plural} from "../../utils";
import './style.css';

function Item({item, buttonClickAction, buttonName, isCartItem}){

  const callbacks = {
    onItemAction: (event, id) => {
      event.stopPropagation();
      buttonClickAction(id);
    }
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{item.code}</div>
      <div className='Item-title'>
        {item.title}
      </div>
	  <div className='Item-price'>
          {`${(item.price.toLocaleString())}  ₽`}
      </div>
	  {isCartItem && <div className='Item-count'>{`${item.count.toLocaleString()} шт`}</div>}
      <div className='Item-actions'>
        <button onClick={(e)=>callbacks.onItemAction(e, item.code)}>
          {buttonName}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
	item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number
  }).isRequired,
  buttonClickAction: PropTypes.func,
};

Item.defaultProps = {
	buttonClickAction: () => {},
}

export default React.memo(Item);
