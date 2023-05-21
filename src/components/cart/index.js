import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import Item from "../item";
import Modal from "../modal";

function Cart({ onClose, cart, onDeleteCartItem, cartSum }) {
  const cn = bem("Cart");
  const callbacks = {
    onDeleteItem: (item) => {
      onDeleteCartItem(item);
    },
  };
  return (
    <Modal onClose={onClose} title="Корзина">
      {cart.length ? (
        <div className={cn()}>
          <div className="empty"></div>
          {cart.map((item) => (
            <div key={item.code} className={cn("item")}>
              <Item
                item={item}
                onClickButton={callbacks.onDeleteItem}
                textButton="Удалить"
              />
            </div>
          ))}
          <div className={cn("result")}>
            <p>Итого:</p>
            <p className={cn("sum")}>{cartSum.toLocaleString("ru-RU")} ₽</p>
          </div>
        </div>
      ) : (
        <h3 className={cn("none")}>Корзина пyста</h3>
      )}
    </Modal>
  );
}
Cart.propTypes = {
  onClose: PropTypes.func,
  onDeleteCartItem: PropTypes.func,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
};

Cart.defaultProps = {
  onClose: () => {},
  onDeleteCartItem: () => {},
};
export default React.memo(Cart);
