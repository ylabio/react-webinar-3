import { memo, useCallback } from "react";
import propTypes from "prop-types";
import { getTranslation, numberFormat } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./style.css";
import useStore from "../../store/use-store";

function ItemBasket(props) {
  const cn = bem("ItemBasket");
  const store = useStore();

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn("title")}>
        <Link
          to={`/item/${props.item._id}`}
          className={cn("title")}
          onClick={callbacks.closeModal}
        >
          {props.item.title}
        </Link>
      </div>
      <div className={cn("right")}>
        <div className={cn("cell")}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn("cell")}>
          {numberFormat(props.item.amount || 0)} {getTranslation("piece")}
        </div>
        <div className={cn("cell")}>
          <button onClick={callbacks.onRemove}>
            {getTranslation("remove")}
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
};

ItemBasket.defaultProps = {
  onRemove: () => {},
};

export default memo(ItemBasket);
