import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import Item from "../item";
import "./style.css";

function List({ items, onClick, text }) {
  const cn = bem("List");

  return (
    <div className={cn()}>
      {items.map((item, index) => (
        <Item key={index} item={item} onClick={onClick} text={text} />
      ))}
    </div>
  );
}

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
    })
  ).isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

List.defaultProps = {
  items: [],
  text: "Click",
  onClick: () => {},
};

export default React.memo(List);
