import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";

function List(props) {
  const { list, action, variant } = props;

  return (
    <div className="List">
      {list.map((item) => (
        <div key={item.code} className="List-item">
          <Item variant={variant} item={item} action={action} />
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
  action: PropTypes.func,
  variant: PropTypes.string,
};

List.defaultProps = {
  action: () => {},
};

export default React.memo(List);
