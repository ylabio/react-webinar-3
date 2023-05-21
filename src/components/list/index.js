import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";

function List({ list, handler, Component }) {
  return (
    <div className="List">
      {list.map((item) => (
        <div key={item.code} className="List-item">
          <Component item={item} handler={handler} />
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
  handler: PropTypes.func,
  Component: PropTypes.elementType,
};

List.defaultProps = {
  handler: () => {},
  Component: null,
};

export default React.memo(List);
