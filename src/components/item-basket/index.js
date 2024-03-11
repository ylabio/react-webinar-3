import { memo } from "react";
import propTypes from "prop-types";
import { numberFormat } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import "./style.css";
import useSelector from "../../store/use-selector";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/use-store";

function ItemBasket(props) {
  const { _id, price, title, amount } = props.item;
  const cn = bem("ItemBasket");
  const navigate = useNavigate();
  const store = useStore();

  const select = useSelector((state) => ({
    data: state.translate.data,
  }));

  const callbacks = {
    onRemove: (e) => props.onRemove(_id),

    onClickLink: (id) => {
      navigate(`/product/${id}`);
      store.actions.modals.close();
    },
  };

  return (
    <div className={cn()}>
      <div className={cn("title")}>
        <a onClick={() => callbacks.onClickLink(_id)}>{title}</a>
      </div>
      <div className={cn("right")}>
        <div className={cn("cell")}>{numberFormat(price)} ₽</div>
        <div className={cn("cell")}>
          {numberFormat(amount || 0)} {select.data.basket.pcs}
        </div>
        <div className={cn("cell")}>
          <button onClick={callbacks.onRemove}>
            {select.data.basket.deleteItemBasketBtn}
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
