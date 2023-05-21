import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function List(props) {
  return (
    <div className="List">
      {props.list
        .sort((a, b) => a.code - b.code)
        .map((item) => (
          <div key={item.code} className="List-item">
            {props.listItem(item, props.onActionItem)}
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
  listItem: PropTypes.func,
  onActionItem: PropTypes.func,
};

List.defaultProps = {
  onActionItem: () => {},
  listItem: () => {},
  actionTitle: "",
};

export default React.memo(List);
