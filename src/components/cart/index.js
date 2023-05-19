import React, { useState } from "react";
import CartModal from "../cart-modal";
import "./style.css";
import PropTypes from 'prop-types'

const Cart = ({ totalCount, totalPrice, list, onDeleteItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="Cart List-item">
        <span>
          В корзине:
          <strong>
            {list.length
              ? ` ${totalCount} товара / ${totalPrice} ₽`
              : " пусто "}
          </strong>
        </span>
        <button className={'Cart-open'} onClick={() => setIsOpen(true)}>Перейти</button>
      </div>
      {isOpen && (
        <CartModal
          totalPrice={totalPrice}
          onClose={() => setIsOpen(false)}
          onDeleteItem={onDeleteItem}
          list={list}
        />
      )}
    </>
  );
};

Cart.propTypes = {
  totalCount: PropTypes.number,
  totalPrice: PropTypes.number,
	list: PropTypes.object,
	onDeleteItem: PropTypes.func
};

export default React.memo(Cart);
