import React from "react";
import PropTypes from "prop-types";
import { addSpaceToNumber, plural } from "../../utils";
import "./style.css";

function Controls({ toggleModal, count, totalPrice }) {
  return (
    <div className="Controls">
      <div className="Controls-text">
        В корзине:{" "}
        <strong>
          {count === 0
            ? "пусто"
            : `${count} ${plural(count, {
                one: "товар",
                few: "товара",
                many: "товаров",
              })} /${addSpaceToNumber(totalPrice)} ₽`}
        </strong>
      </div>
      <button onClick={toggleModal}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default React.memo(Controls);
