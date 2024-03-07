import React, { useState } from "react";
import PropTypes from "prop-types";
import "./style.css";
import modal from "../modal/index";

const plural = require("plural-ru");
function Controls({ setModalActive, cnt, total }) {
  return (
    <div className="Controls">
      В корзине: &nbsp;
      <b>
        {cnt === 0 && total === 0
          ? " пусто"
          : `${cnt} ${plural(cnt, "товар", "товара", "товаров")}  / ${total
              .toString()
              .replace(/(\d)(?=(\d{3})+$)/g, "$1 ")} ₽`}
      </b>
      <button className="Controls_btn" onClick={() => setModalActive(true)}>
        Перейти
      </button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
  onAdd: PropTypes.func,
};

Controls.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Controls);
