import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";

function List({ list, selectItem, btnText }) {
  return (
    <div className="List">
      {list.map((item) => (
        <div key={item?.code} className="List-item">
          <Item item={item} onSelect={selectItem} btnText={btnText} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
    })
  ).isRequired,
  onSelectItem: PropTypes.func,
};

List.defaultProps = {
  onSelectItem: () => {},
};

export default React.memo(List);
