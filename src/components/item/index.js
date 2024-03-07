import React from "react";
import PropTypes from "prop-types";
import { numberFormat } from "../../utils";
import "./style.css";

function Item(props) {

  const getItemInfo = () => {
    return !!props.item.count ?
      <div className="Item-info">
        <div className="Item-info-price">
          {`${numberFormat(props.item.price)} ₽`}
        </div>
        <div className="Item-info-count">
          {`${props.item.count} шт`}
        </div>
      </div>
      :
      <div className="Item-price">
        {`${numberFormat(props.item.price)} ₽`}
      </div>
  }
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
