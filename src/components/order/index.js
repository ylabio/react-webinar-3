import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import Item from "./../item";

function Order({ list, onDelete }) {
  const cn = bem("Order");

  return (
    <div className={cn()}>
      {list.map((item) => (
        <div key={item.code} className={cn("item")}>
          <Item item={item} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}
Order.PropTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      price: PropTypes.number,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,

};
export default React.memo(Order);
