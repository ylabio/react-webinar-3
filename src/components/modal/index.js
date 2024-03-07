import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import List from "../list";
import itemCart from "../item-cart";

const Modal = ({ data, onDeleteItem, totalPrice }) => {
  return (
    <>
      {data.length > 0 ? (
        <>
          <div className="Modal-content-item">
            <List
              ItemComponent={itemCart}
              onDelete={onDeleteItem}
              data={data}
            />
          </div>

          <div className="Modal-content-total">
            <span>Итого</span> <span>{totalPrice} ₽</span>
          </div>
        </>
      ) : (
        <div className="Modal-content-cartempty">
          Ваша корзина пуста! Скорее вернитесь в магазин!
        </div>
      )}
    </>
  );
};

Modal.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
    })
  ).isRequired,
  onDeleteItem: PropTypes.func,
  onCloseModal: PropTypes.func,
  active: PropTypes.bool,
  totalPrice: PropTypes.node,
};

Modal.defaultProps = {
  onDeleteItem: () => {},
  onCloseModal: () => {},
};

export default React.memo(Modal);
