import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";

function List({ list, onAddToCart }) {
  return (
    <div className="List">
      <div className="List-item">
        {list.map((item) => (
          <Item key={item.code} item={item} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default React.memo(List);
