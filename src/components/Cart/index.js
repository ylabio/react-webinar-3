import React from "react";
import PropTypes from "prop-types";
import List from "../list";
import { formatPrice } from "../../utils";
import "./style.css";

function Cart({ list, onActionClick }) {
  return (
    <div>
      <List
        onActionClick={onActionClick}
        list={list}
        actionName="Удалить"
        currencySymbol="шт"
      />
    </div>
  );
}

Cart.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      price: PropTypes.number,
      actionName: PropTypes.string.isRequired,
    })
  ).isRequired,
  onActionClick: PropTypes.func.isRequired,
};

export default React.memo(Cart);
