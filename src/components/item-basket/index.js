import { memo } from "react";
import propTypes from "prop-types";
import { numberFormat } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import "./style.css";

function ItemBasket(props) {
  const { _id, price, amount } = props.item;
  const cn = bem("ItemBasket");

  const callbacks = {
    onRemove: (e) => props.onRemove(_id),
  };

  return (
    <div className={cn()}>
      <div className={cn("title")}>{props.children}</div>
      <div className={cn("right")}>
        <div className={cn("cell")}>{numberFormat(price)} ₽</div>
        <div className={cn("cell")}>
          {numberFormat(amount || 0)} {props.textPcs}
        </div>
        <div className={cn("cell")}>
          <button onClick={callbacks.onRemove}>{props.textDeletetBtn}</button>
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
  onRemove: propTypes.func,
  textPcs: PropTypes.string.isRequired,
  textDeletetBtn: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

ItemBasket.defaultProps = {
  onRemove: () => {},
};

export default memo(ItemBasket);
