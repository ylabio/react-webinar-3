import React from "react";
import PropTypes from 'prop-types';
import List from "../list";
import './style.css';

export function ListCart({ list, isCart, onRemoveFromCart }) {
  return (
    <>
      <div className="Modal-content">
        <List
          list={list}
          isCart={isCart}
          onRemoveFromCart={onRemoveFromCart}
        />
      </div>
    </>
  )
}

ListCart.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  isCart: PropTypes.bool,
  onRemoveFromCart: PropTypes.func.isRequired,
};