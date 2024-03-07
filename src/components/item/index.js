import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item(props) {
  return (
    <div className="Item">
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-price">
        <div className="text">
          <p>{props.item.price}</p>
          <p>₽</p>
        </div>
      </div>
      {props.isIntoCart && (
        <div className="Item-into-cart">
          <div className="text">
            <p>{props.item.amountIntoCart}</p>
            <p>шт</p>
          </div>
        </div>
      )}
      <div className="Item-actions">{props.btn}</div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    amountIntoCart: PropTypes.number,
  }).isRequired,
  isIntoCart: PropTypes.bool,
  btn: PropTypes.node,
};

Item.defaultProps = {
  isIntoCart: false,
  btn: "",
};

export default React.memo(Item);
