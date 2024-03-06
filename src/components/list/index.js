import React, { createElement } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function List({ itemType, data, ...callbacks }) {
  const cn = bem("List");

  return (
    <div className={cn()}>
      {data.map((item) => (
        <div key={item.code} className={cn("item")}>
          {createElement(itemType, { ...item, ...callbacks })}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  itemType: PropTypes.elementType.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
    })
  ).isRequired,
};

List.defaultProps = {
  data: [],
};

export default React.memo(List);
