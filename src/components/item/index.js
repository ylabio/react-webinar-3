import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import "./style.css";

function Item(props) {
  const { _id, price } = props.item;
  const cn = bem("Item");

  const callbacks = {
    onAdd: (e) => props.onAdd(_id),
  };
  return (
    <div className={cn()}>
      <div className={cn("title")}>{props.children}</div>
      <div className={cn("actions")}>
        <div className={cn("price")}>{numberFormat(price)} ₽</div>
        <button onClick={callbacks.onAdd}>{props.titleBtn}</button>
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
  titleBtn: PropTypes.string.isRequired,
  children: PropTypes.node,
};

Item.defaultProps = {
  onAdd: () => {},
  children: "",
};

export default memo(Item);
