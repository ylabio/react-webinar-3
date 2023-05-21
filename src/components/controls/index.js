import React from "react";
import PropTypes from "prop-types";
import { plural } from "../../utils";
import "./style.css";
import Button from "../button";

function Controls({onOpenModal, cartTotalInfo}) {
  const cartValue = cartTotalInfo?.goodsCount > 0 ? (
    <b>
      {`${cartTotalInfo.goodsCount} ${plural(cartTotalInfo.goodsCount, {
        one: "товар",
        few: "товара",
        many: "товаров",
      })} / ${cartTotalInfo.totalPrice.toLocaleString("ru-RU")} `}
      &#8381;
    </b>
  ) : (
    <b>пусто</b>
  );
  return (
    <div className="Controls">
      <div className="Controls-cart">В корзине:&nbsp;&nbsp;{cartValue}</div>
      <div className="Controls-actions">
        <Button onClick={onOpenModal}> Перейти </Button>
      </div>
    </div>
  );
}

Controls.propTypes = {
  cartTotalInfo: PropTypes.shape({
    goodsCount: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired
  }).isRequired,
  onOpenModal: PropTypes.func,
};

Controls.defaultProps = {
  onOpenModal: () => {},
  cartTotalInfo: {
    goodsCount: 0,
    totalPrice: 0
  }
};

export default React.memo(Controls);
