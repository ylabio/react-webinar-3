import { memo, useCallback } from "react";
import propTypes from "prop-types";
import { numberFormat, plural } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import "./style.css";

function ItemBasket({
  item,
  onRemove,
  onTitleClick,
  t,
  optionsConstructor,
  locale,
}) {
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
        <div className={cn("cell")}>
          {numberFormat(item.amount || 0)}&nbsp;
          {plural(item.amount, optionsConstructor("unit"), locale)}
        </div>
        <div className={cn("cell")}>
          <button
            className={cn("removeFromCartBtn")}
            onClick={callbacks.onRemove}
          >
            {t("delete")}
          </button>
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
  t: PropTypes.func.isRequired,
  optionsConstructor: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

ItemBasket.defaultProps = {
  onRemove: () => {},
  onTitleClick: () => {},
  t: () => {},
  optionsConstructor: () => {},
};

export default memo(ItemBasket);
