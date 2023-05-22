import React from "react";
import PropTypes from "prop-types";
import { addSpaceToNumber } from "../../utils";
import "./style.css";

function ModalItem({ item, handleDelete }) {
  const { code, title, price, count } = item;

  return (
    <div className="Modal-item">
      <div className="Modal-item-one">
        <div className="Modal-item-code">{code}</div>
        <div className="Modal-item-title">{title}</div>
      </div>
      <div className="Modal-item-two">
        <div className="Modal-item-price">{addSpaceToNumber(price)} ₽</div>
        <div className="Modal-item-count">{count} шт</div>
        <div className="Modal-item-actions">
          <button onClick={() => handleDelete(code)}>Удалить</button>
        </div>
      </div>
    </div>
  );
}

ModalItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
  }),
  handleDelete: PropTypes.func.isRequired,
};

export default ModalItem;
