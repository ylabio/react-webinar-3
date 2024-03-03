import React from "react";
import PropTypes from "prop-types";
import Button from "./button";
import './style.css';

function Item(props) {
  const { code, title, quantity, price } = props.item;
  const callbacks = {
    onClick: () => {
      props.onClick(code);
    },
  }

  return (
    <div className={'Item'}>
      <div className='Item-code'>{code}</div>
      <div className='Item-title'>
        {title}
      </div>
      <div className="Item-info">
        <p className="Item-price">{`${price} ₽`}</p>
        {quantity && <p className="Item-quantity">{`${quantity} шт`}</p>}
      </div>
      <div className='Item-actions'>
        <Button onClick={callbacks.onClick}>
          {props.action}
        </Button>
      </div>
    </div >
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

Item.defaultProps = {
  onClick: () => {
  },
}

export default React.memo(Item);
