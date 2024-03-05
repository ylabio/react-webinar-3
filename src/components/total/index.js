import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { plural } from "../../utils";
import { formatPrice } from "../../utils";

function Total({ pcs, sum }) {
  return (
    <div className="Total">
      <div>В корзине:</div>
      <div className="Total-info">
        {pcs > 0
          ? `
        ${pcs} ${plural(pcs, {
              one: "товар",
              few: "товара",
              many: "товаров",
            })} / ${formatPrice(sum)}`
          : "пусто"}
      </div>
    </div>
  );
}

Total.propTypes = {
  pcs: PropTypes.number,
  sum: PropTypes.number,
};

export default React.memo(Total);
