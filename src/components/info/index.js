import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { plural } from "../../utils";

const Info = ({ children, products, totalPrice }) => {

  return (
    <section className="info">
      <div className="info-cart">
        В корзине:{" "}
        <span className="info-cart_weight">
          {products.length
            ? `${products.length} ${plural(products.length, {
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
  products: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  totalPrice: PropTypes.node,
};

export default React.memo(Info);
