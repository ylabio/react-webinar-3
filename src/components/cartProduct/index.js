import React from "react";
import PropTypes from "prop-types";
import './styles.css'

const CartProduct = ({code, title, count, price, remove}) => {
  return (
    <li className="cart-product-item">
      <span>{code}</span>
      <span>{title}</span>
      <span>{price} &#8381;</span>
      <span>{count}</span>
      <button onClick={() => remove(code)}>Удалить</button>
    </li>
  );
};

export default CartProduct;

CartProduct.propTypes = {
  code: PropTypes.number,
  title: PropTypes.string,
  price: PropTypes.number,
  count: PropTypes.number,
  remove: PropTypes.func
};

CartProduct.defaultProps = {
  code: 0,
  title: '',
  price: 0,
  count: 0,
  remove: () => {}
};
