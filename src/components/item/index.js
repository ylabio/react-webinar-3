import React from "react";
import PropTypes from "prop-types";
import {numberFormat} from "../../utils";
import "./style.css";

function Item(props) {
  return (
    <div className="Item-info">
  </div>
  )
}

Item.propTypes = {
  item: PropTypes.shape({
    price: PropTypes.number,
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number
  }),
  funcButton: PropTypes.func
};

Item.defaultProps = {
  funcButton: () => {
  }
}

export default React.memo(Item);
