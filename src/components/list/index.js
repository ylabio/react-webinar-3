import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";
import { plural, pluralNumber } from "../../utils";

function List({ list, onActionClick, actionsBtnText }) {
  return (
    <div className="List">
      {list.map((item) => (
        <div key={item.code} className="List-item">
          <Item
            item={item}
            onClick={onActionClick}
            actionsText={pluralNumber(item.price)}
            actionsBtnText={actionsBtnText}
            extraText={item.count && `${item.count} шт`}
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
  onActionClick: PropTypes.func,
};

List.defaultProps = {
  onActionClick: () => {},
};

export default React.memo(List);
