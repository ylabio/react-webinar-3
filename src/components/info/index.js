import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { plural } from "../../utils";

const Info = ({ children, data, totalPrice }) => {

  return (
    <section className="info">
      <div className="info-cart">
        В корзине:{" "}
        <span className="info-cart_weight">
          {data.length
            ? `${data.length} ${plural(data.length, {
                one: "товар",
                few: "товара",
                many: "товаров",
              })} ${totalPrice} ₽`
            : "пусто"}
        </span>
      </div>
      {children}
    </section>
  );
};

Info.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
    })
  ).isRequired,
  totalPrice: PropTypes.node,
  children: PropTypes.node,
};

export default React.memo(Info);
