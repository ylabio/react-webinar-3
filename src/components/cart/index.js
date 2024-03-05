import React from "react";
import Head from "../head";
import List from "../list";
import Item from "../item";
import PropTypes from "prop-types";
import { formatPrice } from "../../utils";
import "./style.css";

function Cart({ cartItems, cartSum, onDelete }) {
  function renderItemButton(item) {
    const itemCallbacks = {
      onDeleteItem: (e) => {
        e.stopPropagation();
        onDelete(item);
      },
    };
    return <button onClick={itemCallbacks.onDeleteItem}>Удалить</button>;
  }

  function renderList(list) {
    return list.map((item) => (
      <div key={item.code} className="List-item">
        <Item item={item} renderButton={renderItemButton} />
      </div>
    ));
  }

  return (
    <div className="Cart">
      <List list={cartItems} renderList={renderList} />
      <div className="Cart-sum">
        <div>Итого</div>
        <div>{formatPrice(cartSum)} </div>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  cartSum: PropTypes.number,
  onDelete: PropTypes.func,
};

Cart.defaultProps = {
  onDelete: () => {},
};

export default React.memo(Cart);
