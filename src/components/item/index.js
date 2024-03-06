import React from "react";
import PropTypes from "prop-types";
import Controls from "../controls/";
import './style.css';
import Store from '../../store'

function Item(props) {

  const handleAddToCart = () => {
    props.onAddToCart(props.item);
  }
  const handleDeleteToCart = () => {
    props.deleteItemCart(props.item);
  }


  return (
    <div className="Item">
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className={props.cartVisible ? "Item-price" : "Item-price-cart"}>{props.item.price.toLocaleString('ru-RU')} ₽</div>
      {!props.cartVisible && <div className="Item-quantity">{props.item.quantity} шт</div>}
      <div className="Item-actions">
        <Controls action={props.cartVisible ? handleAddToCart: handleDeleteToCart} textButton={props.textButton}/>
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
