import { memo } from "react";
import propTypes from "prop-types";
import { numberFormat } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import "./style.css";
import { useNavigate } from "react-router-dom";

function ItemBasket(props) {
  const { _id, price, title, amount } = props.item;
  const cn = bem("ItemBasket");
  const navigate = useNavigate();

  const callbacks = {
    onRemove: (e) => props.onRemove(_id),

    onClickLink: (id) => {
      navigate(`/product/${id}`);
      props.closeModal();
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
  closeModal: PropTypes.func.isRequired,
};

ItemBasket.defaultProps = {
  onRemove: () => {},
};

export default memo(ItemBasket);
