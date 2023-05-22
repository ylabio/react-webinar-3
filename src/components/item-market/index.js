import './style.css';
import React from "react";
import PropTypes from "prop-types";
import {priceFormatCreator} from "../../utils";

function ItemMarket(props) {

  const callbacks = {
    onClick: (e) => {
      e.stopPropagation();
      props.onBtnClickAction(props.item.code);
    }
  }

  return (<div className={'Item-market'}>
    <div className='Item-market__code'>{props.item.code}</div>
    <div className='Item-market__title'>
      {props.item.title}
    </div>
    <div className='Item-market__info'>
      <div className='Item-market__price'>
        {`${priceFormatCreator(props.item.price)} ₽`}
      </div>
      <div className='IItem-market__actions'>
        <button onClick={callbacks.onClick}>
          {props.buttonText}
        </button>
      </div>
    </div>
  </div>);
}

ItemMarket.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    count: PropTypes.number
  }).isRequired,
  buttonText: PropTypes.string,
  count: PropTypes.number,
  onBtnClickAction: PropTypes.func
};

export default React.memo(ItemMarket);