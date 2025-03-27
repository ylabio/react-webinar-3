import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import List from "../list";

function Cart({ cartList, totalPrice = 0, onAdd = (e) => {}, onDelete = (e) => {}}) {
  return (
    <div className="Cart">
      <div className="Cart-title">
        Корзина
      </div>

      <div className="Cart-list">
        <List
          list={cartList}
          onAddItem={onAdd}
          onDeleteItem={onDelete}
        />
      </div>

      <div className="Cart-total">
        <div className="wrapper-1">
        </div>
        <div className="wrapper-2">
          <div>
            Итого:
          </div>
          <div>
            {totalPrice.toLocaleString('ru-RU')} &#8381;
          </div>
        </div>
        <div className="wrapper-3">
        </div>

      </div>
    </div>
  );
}

Cart.propTypes = {
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
  cartList: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })),
  totalPrice: PropTypes.number,
};

export default React.memo(Cart);
