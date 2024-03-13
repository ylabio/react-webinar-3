import { memo, useCallback } from "react";
import propTypes from "prop-types";
import { numberFormat } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import "./style.css";

function ItemBasket({ item, onRemove, onTitleClick }) {
  const cn = bem("ItemBasket");

  const callbacks = {
    onRemove: (e) => onRemove(item._id),
    onTitleClick: () => onTitleClick(item._id),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{item._id}</div>*/}
      <div className={cn("title")}>
        <span onClick={callbacks.onTitleClick}>{item.title}</span>
      </div>
      <div className={cn("right")}>
        <div className={cn("cell")}>{numberFormat(item.price)} ₽</div>
        <div className={cn("cell")}>{numberFormat(item.amount || 0)} шт</div>
        <div className={cn("cell")}>
          <button onClick={callbacks.onRemove}>Удалить</button>
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
  onTitleClick: PropTypes.func,
};

ItemBasket.defaultProps = {
  onRemove: () => {},
  onTitleClick: () => {},
};

export default memo(ItemBasket);
