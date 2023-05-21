import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";

function List({
  list,
  onDeleteItem,
  onSelectItem,
  btnItem,
  count = null,
  onAddItem,
}) {
  return (
    <div className="List">
      {list.map((item) => (
        <div key={item.code} className="List-item">
          <Item
            onAddItem={onAddItem}
            item={item}
            onDelete={onDeleteItem}
            onSelect={onSelectItem}
            btnItem={btnItem}
            count={item.count}
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
  onDeleteItem: PropTypes.func,
  onSelectItem: PropTypes.func,
};

List.defaultProps = {
  onDeleteItem: () => {},
  onSelectItem: () => {},
};

export default React.memo(List);
