import React, {useState} from "react";
import PropTypes from "prop-types";
import {plural} from "../../utils";
import './style.css';

function Item(props) {

  const callbacks = {
    handleClick: (e) => {
      if (props.place === 'catalog') {
        props.addToBasket(props.item);
      } else {
        props.deleteItem(props.item.code);
      }
      props.getBasket();
    },
  }
  console.log(props.place)

  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-price'>{props.item.price} ₽</div>
      {props.place === 'basket' ? <div className={'Item-quantity'}>{props.item.quantity} шт.</div> : null}
      <div className='Item-actions'>
        <button onClick={callbacks.handleClick}>
          {props.place === 'catalog' ? 'Добавить' : 'Удалить'}
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
  getBasket: PropTypes.func,
  deleteItem: PropTypes.func,
};

Item.defaultProps = {
  addToBasket: () => {
  },
  getBasket: () => {},
  deleteItem: () => {}
}

export default React.memo(Item);
