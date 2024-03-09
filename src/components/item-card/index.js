import { memo } from "react";
import PropTypes from "prop-types";
import { numberFormat } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import useTranslation from "../../hooks/useTranslation";
import "./style.css";

function ItemCard({ itemData, onAdd }) {
  const cn = bem("ItemCard");
  const callbacks = {
    onAdd: (e) => onAdd(itemData._id),
  };

  const [getTranslation] = useTranslation();
  return (
    <div className={cn()}>
      <div className={cn("info")}>
        <div className={cn("properties")}>{itemData.description}</div>
        <div className={cn("properties")}>
          {getTranslation("madeIn")}:
          <span>
            {" "}
            {itemData.country} ({itemData.countryCode}){" "}
          </span>
        </div>
        <div className={cn("properties")}>
          {getTranslation("category")}: <span>{itemData.category}</span>
        </div>
        <div className={cn("properties")}>
          {getTranslation("year")}: <span>{itemData.year}</span>
        </div>
        <div className={cn("price")}>
          {getTranslation("price")}:
          <span>{numberFormat(itemData.price)} ₽</span>
        </div>

        <button onClick={callbacks.onAdd}>{getTranslation("add")}</button>
      </div>
    </div>
  );
}

ItemCard.propTypes = {
  itemData: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    country: PropTypes.string,
    countryCode: PropTypes.string,
    category: PropTypes.string,
    year: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

ItemCard.defaultProps = {
  onAdd: () => {},
};

export default memo(ItemCard);
