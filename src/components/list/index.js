import PropTypes from "prop-types";
import React from "react";
import Item from "../item";
import "./style.css";

function List({ list, Item, onAction, className }) {
  return (
    <div className={`List ${className ?? ''}`}>
      {list.map((el) => (
        <div key={el.code} className="List-item">
          <Item item={el} onAction={onAction} />
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
