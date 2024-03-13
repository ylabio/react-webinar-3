import { cn as bem } from "@bem-react/classname";
import { default as PropTypes, default as propTypes } from "prop-types";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/use-store";
import { numberFormat } from "../../utils";
import "./style.css";

function ItemBasket(props) {
  const cn = bem("ItemBasket");

  const store = useStore();
  const navigate = useNavigate();

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    openDetails: () => {
      store.actions.modals.close();
      navigate(`/product/${props.item._id}`);
    },
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div onClick={callbacks.openDetails} className={cn("title")}>
        {props.item.title}
      </div>
      <div className={cn("right")}>
        <div className={cn("cell")}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn("cell")}>
          {numberFormat(props.item.amount || 0)} шт
        </div>
        <div className={cn("cell")}>
          <button onClick={callbacks.onRemove}>Удалить</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
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
