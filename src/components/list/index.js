import PropTypes from "prop-types";
import React from "react";
import "./style.css";

function List({ list, Item, itemProps }) {
  return (
    <div className="List">
      {list.map((item) => (
        <div key={item.code} className="List-item">
          <Item item={item} {...itemProps} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }).isRequired
  ),
  Item: PropTypes.elementType.isRequired,
  itemProps: PropTypes.object,
};

List.defaultProps = {
  list: [],
  itemProps: {},
};

export default React.memo(List);
