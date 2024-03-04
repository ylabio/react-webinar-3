import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import Head from "../head";
import { getTotal } from "../../scripts/getTotal";
import "./style.css";

function Cart({ cart, onDeleteItem, showCart, changeCartVisability }) {
  const callbacks = {
    hideCart: () => {
      changeCartVisability();
    },
  };
  return (
    showCart && (
      <div className="Cart-Background">
        <div className="Cart">
          <Head title={"Корзина"} />
          <button className="Cart-Button" onClick={callbacks.hideCart}>
            Закрыть
          </button>
          {cart.map((item) => (
            <div key={item.code} className="Cart-Item">
              <Item
                item={item}
                itemFunction={onDeleteItem}
                button={"Удалить"}
              />
            </div>
          ))}
          {cart.length ? (
            <div className="Cart-Total">
              Итого<div className="Cart-Total-Numb">{getTotal(cart)} ₽</div>
            </div>
          ) : (
            <div className="Cart-Empty">В корзине пусто.</div>
          )}
        </div>
      </div>
    )
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  onDeleteItem: PropTypes.func,
  changeCartVisability: PropTypes.func,
};

Cart.defaultProps = {
  onDeleteItem: () => {},
  changeCartVisability: () => {},
};

export default React.memo(Cart);
