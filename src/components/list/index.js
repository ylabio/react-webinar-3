import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";

function List({ list, onItemAddToBasket }) {
  return (
    <div className="List">
      {list.map((item) => (
        <div key={item.code} className="List-item">
          <Item item={item} onAddToBasket={onItemAddToBasket} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  onItemAddToBasket: PropTypes.func,
};

List.defaultProps = {
  list: [],
  onSelectItem: () => {},
};

export default React.memo(List);
