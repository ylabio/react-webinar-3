import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function List(props) {
  const { list, renderItem } = props;
  return (
    <div className="List">
      {list.map((item) => {
        return (
          <div key={item.code} className="List-item">
            {renderItem(item)}
          </div>
        );
      })}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  renderItem: PropTypes.func.isRequired,
};

export default React.memo(List);
