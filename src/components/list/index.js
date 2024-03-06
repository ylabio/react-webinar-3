import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import ItemCart from "../itemcart";
import "./style.css";

function List({ list, onActionClick, actionName, currencySymbol }) {
  return (
    <div className="List">
      {list.map((item) => (
        <div key={item.code} className="List-item">
          {item.type === "item" ? (
            <Item // используем компонент Item для одного типа
              item={item}
              price={item.price}
              onActionClick={onActionClick}
              actionName={actionName}
            />
          ) : (
            <ItemCart // используем компонент ItemCart для другого типа
              item={item}
              price={item.price}
              onActionClick={onActionClick}
              actionName={actionName}
              currencySymbol={currencySymbol}
            />
          )}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      currencySymbol: PropTypes.string,
      type: PropTypes.oneOf(["item", "itemCart"]),
    })
  ).isRequired,
  actionName: PropTypes.string.isRequired,
  onActionClick: PropTypes.func.isRequired,
};

export default React.memo(List);
