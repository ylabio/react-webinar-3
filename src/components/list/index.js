import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";

function List({ list, btnTitle, showCount, onSmthDo }) {
  return (
    <div className="List">
      {list.map((item) => (
        <div key={item.code} className="List-item">
          <Item
            item={item}
            showCount={showCount}
            btnTitle={btnTitle}
            onSmthDo={onSmthDo}
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
  onSmthDo: PropTypes.func,
  showCount: PropTypes.func,
  btnTitle: PropTypes.string,
  showCount: PropTypes.bool,
  item: PropTypes.shape({
    code: PropTypes.number,
  }),
};

List.defaultProps = {
  onSmthDo: () => {},
};

export default React.memo(List);
