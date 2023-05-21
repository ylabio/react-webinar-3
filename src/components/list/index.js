import PropTypes from "prop-types";
import React from "react";
import "./style.css";

function List({ list, Item, onAction }) {
  return (
    <div className="List">
      {list.map((unit) => (
        <div key={unit.code} className="List-item">
          <Item item={unit} onAction={onAction} />
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
	Item: PropTypes.node,
	onAction: PropTypes.func
};

export default React.memo(List);