import './style.css';
import React from "react";
import PropTypes from "prop-types";
import {priceFormatCreator} from "../../utils";

function ItemBasket(props) {

  const callbacks = {
    onClick: (e) => {
      e.stopPropagation();
      props.onBtnClickAction(props.item.code);
    }
  }

  return (<div className={'Item-basket'}>
    <div className='Item-basket__code'>{props.item.code}</div>
    <div className='Item-basket__title'>
      {props.item.title}
    </div>
    <div className='Item-basket__info'>
      <div className='Item-basket__price'>
        {`${priceFormatCreator(props.item.price)} ₽`}
      </div>
      <div className='Item-basket__count'>
        {`${props.item.count} шт`}
      </div>
      <div className='Item-basket__actions'>
        <button onClick={callbacks.onClick}>
          {props.buttonText}
        </button>
      </div>
    </div>
  </div>);
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    count: PropTypes.number.isRequired
  }).isRequired,
  buttonText: PropTypes.string,
  count: PropTypes.number,
  onBtnClickAction: PropTypes.func
};


export default React.memo(ItemBasket);