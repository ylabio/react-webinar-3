import React from "react";
import PropTypes from "prop-types";
import Controls from "../controls/";
import './style.css';

function ItemCart(props) {

const handleDeleteItemCart = () => {
    props.deleteItemCart(props.item.code);
  };


  return (
    <div className="Cart">
      <div className="Cart-code">{props.item.code}</div>
      <div className="Cart-title">{props.item.title}</div>
      <div className="Cart-price">{props.item.price} ₽</div>
      <div className="Cart-quantity">{props.item.quantity} шт</div>
      <div className="Cart-actions">
        <Controls action={handleDeleteItemCart} textButton="Удалить" 
      />
      </div>
    </div>
  );
}

ItemCart.propTypes = {
    item: PropTypes.shape({
        code: PropTypes.number,
        title: PropTypes.string,
        price: PropTypes.number,
        quantity: PropTypes.number
  }).isRequired,
  action: PropTypes.func.isRequired, 
};


export default React.memo(ItemCart);
