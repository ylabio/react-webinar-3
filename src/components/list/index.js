import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";

function List(props) {
  return (
    <div className="List">
      {props.list.map((item) => (
        <div key={item.code} className="List-item">
          {item.count ? (
            <Item
              item={item}
              count={item.count}
              onDeleteBasket={props.onDeleteBasket}
            />
          ) : (
            <Item item={item} onAddBasket={props.onAddBasket} />
          )}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      count: PropTypes.number,
    })
  ).isRequired,
  onAddBasket: PropTypes.func,
  onDeleteBasket: PropTypes.func,
};

List.defaultProps = {
  onAddBasket: () => {},
  onDeleteBasket: () => {},
};

export default React.memo(List);
