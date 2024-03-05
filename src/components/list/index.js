import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";

function List({ list, renderList }) {
  return <div className="List">{renderList(list)}</div>;
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  renderList: () => {},
};

List.defaultProps = {
  renderList: () => {},
};

export default React.memo(List);
