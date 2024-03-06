import React from "react";
import PropTypes from "prop-types";
import CartItem from "../cart-item";
import Head from "../head";
import "./style.css";

function Cart(props) {
  const callbacks = {
    function: () => {
      props.hideCart();
      props.onDeleteItem();
    },
  };
  return (
        <div className="Cart">
          <Head title={"Корзина"} />
          <button className="Cart-Button" onClick={props.hideCart}>
            Закрыть
          </button>
          {props.cart.map((item) => (
            <div key={item.code} className="Cart-Item">
              <CartItem
                item={item}
                itemFunction={props.onDeleteItem}
                button={"Удалить"}
              />
            </div>
          ))}
          {props.cart.length ? (
            <div className="Cart-Total">
              Итого<div className="Cart-Total-Numb">{props.cost ? Intl.NumberFormat().format(props.cost) : 0} ₽</div>
            </div>
          ) : (
            <div className="Cart-Empty">В корзине пусто.</div>
          )}
        </div>
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
