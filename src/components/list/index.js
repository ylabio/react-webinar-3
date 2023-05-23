import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";

function List({ list, buttonText, onClick }) {
  return (
    <div className="List">
      {list.map((item) => (
        <div key={item.code} className="List-item">
          <Item item={item} buttonText={buttonText} onClick={onClick} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  buttonText: PropTypes.node,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,

  onClick: PropTypes.func,
};

List.defaultProps = {
  onClick: () => {},
};

export default React.memo(List);
