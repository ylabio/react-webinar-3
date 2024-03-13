import { memo, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import "./style.css";

function Item({ item, onAdd, onTitleClick }) {
  const cn = bem("Item");

  const callbacks = {
    onAdd: (e) => onAdd(item._id),
    onTitleClick: () => onTitleClick(item._id),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{item._id}</div>*/}
      <div className={cn("title")}>
        <span onClick={callbacks.onTitleClick}>{item.title}</span>
      </div>
      <div className={cn("actions")}>
        <div className={cn("price")}>{numberFormat(item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
  onTitleClick: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
  onTitleClick: () => {},
};

export default memo(Item);
