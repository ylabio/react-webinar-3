import React from "react";
import { addSpaceToNumber } from "../../utils";
import "./style.css";

const ModalTotal = ({ totalPrice }) => {
  return (
    <div>
      <div className="Modal-item-info">
        <div>Итого</div>
        <div>{addSpaceToNumber(totalPrice)} ₽</div>
      </div>
    </div>
  );
};

export default ModalTotal;
