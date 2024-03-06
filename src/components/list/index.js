import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";

function List({ list, onActionClick, actionName,  }) {
  return (
    <div className="List">
      {list.map((item) => (
        <div key={item.code} className="List-item">
          <Item
            item={item}
            price={item.price}
            onActionClick={onActionClick}
            actionName={actionName}
            quantity='P'
          />
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
  actionName: PropTypes.string.isRequired,
  onActionClick: PropTypes.func.isRequired,
};

export default React.memo(List);
