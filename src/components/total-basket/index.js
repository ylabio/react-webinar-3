import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { plural } from "../../utils";

function TotalBasket({totalPrice}) {
  return (
    <div className="TotalBasket-foooter">
      <span className="TotalBasket-foooter-text">Итого</span>{" "}
      <span>{totalPrice.toLocaleString()} &#8381;</span>
    </div>
  );
}

TotalBasket.propTypes = {
  totalPrice: PropTypes.number.isRequired,
};

export default React.memo(TotalBasket);
