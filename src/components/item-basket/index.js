import { memo } from "react";
import { numberFormat } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";
import { plural } from "../../utils";
import PropTypes from "prop-types";
import "./style.css";

function ItemBasket(props) {
  const cn = bem("ItemBasket");

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    onClickItem: () => props.onTransition(props.item._id),
  };

  return (
    <div className={cn()}>
      <Link
        to={`${props.url}/${props.item._id}`}
        onClick={callbacks.onClickItem}
        className={cn("title")}
      >
        {props.item.title}
      </Link>
      <div className={cn("right")}>
        <div className={cn("cell")}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn("cell")}>
          {`${numberFormat(props.item.amount || 0)} ${plural(
            props.item.amount,
            {
              one: props.text[0],
              other: props.text[1],
            },
            "en-US"
          )} `}
        </div>
        <div className={cn("cell")}>
          <button onClick={callbacks.onRemove}>{props.text[2]}</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: PropTypes.func,
  text: PropTypes.arrayOf(PropTypes.string),
};

ItemBasket.defaultProps = {
  onRemove: () => {},
  text: ["шт", "шт", "Удалить"],
};

export default memo(ItemBasket);
