import React, { useState } from "react";
import PropTypes from "prop-types";
import { formatText, plural } from "../../utils";
import "./style.css";
import List from "../list";
import itemStore from '../item-cart';

function Cart(props) {
  return (
    <>
      {props.list.length ? (
        <>
          <List
            list={props.list}
            onActionItem={props.onAction}
            listItem={itemStore}
            actionTitle={props.actionTitle}
          />
          <div className="Total">
            <strong>Итого</strong>
            <strong>{formatText(props.totalPrice, "₽")}</strong>
          </div>
        </>
      ) : (
        <p className="Cart-empty">В корзине нет товаров</p>
      )}
    </>
  );
}

Cart.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  totalPrice: PropTypes.number,
  onAction: PropTypes.func,
  actionTitle: PropTypes.string,
};

Cart.defaultProps = {
  onAction: () => {},
  actionTitle: "",
};

export default React.memo(Cart);
