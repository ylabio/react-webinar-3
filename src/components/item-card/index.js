import { memo } from "react";
import PropTypes from "prop-types";
import { numberFormat } from "../../utils";
import { cn as bem } from "@bem-react/classname";

import "./style.css";

function ItemCard({ itemData, onAdd, getTranslation }) {
  const cn = bem("ItemCard");
  const callbacks = {
    onAdd: (e) => onAdd(itemData._id),
  };

  //const foo = (key) => (getTranslation ? getTranslation(key) : " ");

  return (
    <div className={cn()}>
      <div className={cn("info")}>
        <div className={cn("properties")}>{itemData.description}</div>
        <div className={cn("properties")}>
          {getTranslation ? getTranslation("madeIn") : "Страна производитель"}:
          <span>
            {" "}
            {itemData.country} ({itemData.countryCode}){" "}
          </span>
        </div>
        <div className={cn("properties")}>
          {getTranslation ? getTranslation("category") : "Категория"}:{" "}
          <span>{itemData.category}</span>
        </div>
        <div className={cn("properties")}>
          {getTranslation ? getTranslation("year") : "Год выпуска"}:{" "}
          <span>{itemData.year}</span>
        </div>
        <div className={cn("price")}>
          {getTranslation ? getTranslation("price") : "Цена"}:
          <span>{numberFormat(itemData.price)} ₽</span>
        </div>

        <button onClick={callbacks.onAdd}>
          {getTranslation ? getTranslation("add") : "Добавить"}
        </button>
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
