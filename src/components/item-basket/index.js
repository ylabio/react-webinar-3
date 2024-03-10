import { memo } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { numberFormat } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import { useLanguage } from "../../localization/LanguageContext";
import { dictionary } from "../../localization/dictionary";
import "./style.css";

function ItemBasket(props) {
  const cn = bem("ItemBasket");

  const callbacks = {
    removeFromBasket: () => props.onRemove(props.item._id),
    closeModal: () => props.onClose(),
  };

  const { currentLanguage } = useLanguage();
  const { pcs, delete_item, currency } = dictionary[currentLanguage];
  return (
    <div className={cn()}>
      <div className={cn("title")}>
        <Link to={`/${props.item._id}`} onClick={callbacks.closeModal}>
          {props.item.title}
        </Link>
      </div>
      <div className={cn("right")}>
        <div className={cn("cell")}>
          {numberFormat(props.item.price)} {currency}
        </div>
        <div className={cn("cell")}>
          {numberFormat(props.item.amount || 0)} {pcs}
        </div>
        <div className={cn("cell")}>
          <button onClick={callbacks.removeFromBasket}>{delete_item}</button>
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
