import React, {useState} from "react";
import PropTypes from "prop-types";
import {plural} from "../../utils";
import './style.css';

function Item(props) {

  const callbacks = {
    addToBasket: (e) => {
      e.stopPropagation();
      props.addToBasket(props.item.code);
      props.addToBasketCount();
    }
  }

  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-price'>{props.item.price} ₽</div>
      <div className='Item-actions'>
        <button onClick={callbacks.addToBasket}>
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
  }).isRequired,
  addToBasket: PropTypes.func,
  addToBasketCount: PropTypes.func,
};

Item.defaultProps = {
  addToBasket: () => {
  },
  addToBasketCount: () => {},
}

export default React.memo(Item);
