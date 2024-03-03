import React from "react";
import PropTypes from "prop-types";
import Controls from "../controls/";
import './style.css';

function Item(props) {

  const handleAddToCart = () => {
    props.onAddToCart(props.item);
  }


  return (
    <div className="Item">
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-price">{props.item.price} ₽</div>
      <div className="Item-actions">
        <Controls action={handleAddToCart} textButton="Добавить"/>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  action: PropTypes.func,
};

Item.defaultProps = {
  action: () => {
  },
}

export default React.memo(Item);
