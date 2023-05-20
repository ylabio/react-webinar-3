import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import {plural} from "../../utils";

function Controls({cartInfo, setIsModalOpen}) {

  const cn = bem("Controls");

  return (
    <div className={cn()}>
      <div className={cn("cart")}>
        В корзине:
        <span className={cn("total")}>
          {cartInfo.uniqueCountProducts
            ? `${cartInfo.uniqueCountProducts} ${plural(cartInfo.uniqueCountProducts, {
              one: "товар",
              few: "товара",
              many: "товаров",
            })} / ${cartInfo.totalPrice} ₽`
            : "пусто"}
        </span>
      </div>
      <button
        className={cn("button")}
        onClick={() => {
          setIsModalOpen(true);
        }}>Перейти
      </button>
    </div>
  );
}


Controls.propTypes = {
  cartInfo: PropTypes.object,
  setIsModalOpen: PropTypes.func
};


export default React.memo(Controls);
