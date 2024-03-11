import { memo, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import "./style.css";
import { Link } from "react-router-dom";
import useSelector from "../../store/use-selector";

function Item(props) {
  const { _id, price, title } = props.item;
  const cn = bem("Item");
  const select = useSelector((state) => ({
    data: state.translate.data,
  }));
  const callbacks = {
    onAdd: (e) => props.onAdd(_id),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn("title")}>
        <Link to={`/product/${_id}`}>{title}</Link>
      </div>
      <div className={cn("actions")}>
        <div className={cn("price")}>{numberFormat(price)} ₽</div>
        <button onClick={callbacks.onAdd}>{select.data.main.addBtn}</button>
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
};

Item.defaultProps = {
  onAdd: () => {},
};

export default memo(Item);
