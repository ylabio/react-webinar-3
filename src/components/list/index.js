import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";

function List({ list, onAction, action }) {
  return (
    <div className="List">
      {list.map((item) => (
        <div key={item.code} className="List-item">
          <Item item={item} onAction={onAction} action={action} />
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
  action: PropTypes.string,
  onAction: PropTypes.func,
};

List.defaultProps = {
  onAction: () => {},
};

export default React.memo(List);
