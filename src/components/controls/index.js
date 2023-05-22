import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import Button from "../button";
import { plural } from "../../utils";

function Controls({ onClick, totalQuantity, totalCost }) {
  return (
    <div className="Controls">
      <span>В корзине:</span>
      {totalQuantity === 0 && <span><b>пусто</b></span>}
      {totalQuantity > 0 && (
        <>
          <span>
            <b>
              {totalQuantity} {" "}
              {plural(totalQuantity, {
                one: "товар",
                few: "товара",
                many: "товаров",
              })}{" "}
              / {totalCost.toLocaleString("ru-RU") } &#8381;
            </b>
          </span>
        </>
      )}
      <Button title={"Перейти"} onClick={onClick} />
    </div>
  );
}

Controls.propTypes = {
  onClick: PropTypes.func,
  totalQuantity: PropTypes.number.isRequired,
  totalCost: PropTypes.number.isRequired,
};

Controls.defaultProps = {
  onClick: () => {},
};

export default React.memo(Controls);
