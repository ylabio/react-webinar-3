import PropTypes from "prop-types";
import React from "react";
import Item from "../item";
import "./style.css";

function List({ items, onButtonClick, buttonText }) {
  return (
    <div className="List">
      {items.map((item) => (
        <div key={item.code} className="List-item">
          <Item
            item={item}
            onButtonClick={onButtonClick}
            buttonText={buttonText}
          />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  onButtonClick: PropTypes.func,
  buttonText: PropTypes.string,
};

List.defaultProps = {
  onButtonClick: () => {},
  buttonText: "",
  items: [],
};

export default React.memo(List);
