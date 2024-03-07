import React, { useCallback } from "react";
import List from "../list";
import Item from "../item";
import Head from "../head";
import Modal from "../modal";
import { formatPrice } from "../../utils";
import PropTypes from "prop-types";
import "./style.css";

function Cart({ cart, isShown, onClose, onDeleteItem }) {
  const totalSum = cart.reduce(
    (total, cartItem) => total + cartItem.price * cartItem.quantity,
    0
  );

  function renderItemButton(item) {
    const itemCallbacks = {
      onDeleteItem: (e) => {
        e.stopPropagation();
        onDeleteItem(item);
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
    <Modal onClose={onClose} isShown={isShown}>
      <div className="Cart">
        <div className="Cart-head">
          <Head title="Корзина">
            <button onClick={onClose}>Закрыть</button>
          </Head>
        </div>
        <div className="Cart-list">
          <List list={cart} renderList={renderList} />
        </div>
        <div className="Cart-sum">
          <div>Итого</div>
          <div>{formatPrice(totalSum)} </div>
        </div>
      </div>
    </Modal>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  isShown: PropTypes.bool,
  onClose: PropTypes.func,
  onDeleteItem: PropTypes.func,
};

Cart.defaultProps = {
  onClose: () => {},
  onDeleteItem: () => {},
};

export default React.memo(Cart);
