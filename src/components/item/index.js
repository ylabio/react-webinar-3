import './style.css';
import React, from "react";
import PropTypes from "prop-types";

function Item(props) {

  const callbacks = {
    onClick: (e) => {
      e.stopPropagation();
      props.onBtnClickAction(props.item.code);
    }
  }

  return (<div className={'Item'}>
    <div className='Item-code'>{props.item.code}</div>
    <div className='Item-title'>
      {props.item.title}
    </div>
    <div className='Item-info'>
      <div className='Item-price'>
        {`${props.item.price} ₽`}
      </div>
      {
        props.basketMode &&
        <div className='Item-count'>
          {`${props.count} шт`}
        </div>
      }
      <div className='Item-actions'>
        <button onClick={callbacks.onClick}>
          {props.buttonText}
        </button>
      </div>
    </div>
  </div>);
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number, title: PropTypes.string, selected: PropTypes.bool, count: PropTypes.number
  }).isRequired,
  buttonText: PropTypes.string,
  count: PropTypes.number,
  onBtnClickAction: PropTypes.func,
  basketMode: PropTypes.bool
};

export default React.memo(Item);