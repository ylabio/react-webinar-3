import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import { Link } from "react-router-dom";
import "./style.css";

function Item(props) {
  const cn = bem("Item");

  const callbacks = {
    onAdd: () => props.onAdd(props.item._id),
    onClickItem: () => props.onTransition(props.item._id),
  };

  return (
    <div className={cn()}>
      <div className={cn("title")}>
        <Link
          to={`${props.url}/${props.item._id}`}
          onClick={callbacks.onClickItem}
          className={cn('link')}
        >
          {props.item.title}
        </Link>
      </div>
      <div className={cn("actions")}>
        <div className={cn("price")}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{props.text}</button>
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
  text: PropTypes.string,
};

Item.defaultProps = {
  text: 'Добавить',
  onAdd: () => {},
};

export default memo(Item);
