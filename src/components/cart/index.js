import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import List from "../list";

function Cart({ list, onDeleteItem, price }) {
  return (
    <div className="Cart">
      {list.length == 0 ? (
        <h3 style={{ textAlign: "center" }}>Пусто</h3>
      ) : (
        <>
          <List list={list} selectItem={onDeleteItem} btnText={1} />
          <div className="Cart-title">
            <b>Итого</b>
            <b className="Cart-title-price">{price.toLocaleString("ru")}</b>
          </div>
        </>
      )}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    })
  ).isRequired,
  onDeleteItem: PropTypes.func,
};

List.defaultProps = {
  onDeleteItem: () => {},
};

export default React.memo(Cart);
