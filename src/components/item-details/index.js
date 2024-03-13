import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import React from "react";
import { numberFormat } from "../../utils";
import "./style.css";

function ItemDetails({ item, onAdd }) {
  const cn = bem("ItemDetails");

  return (
    <div className={cn()}>
      <div className={cn("cell")}>
        <p className={cn("description")}>{item.description}</p>
      </div>
      <div className={cn("cell")}>
        <p className={cn("country")}>
          Страна производитель: <span>{item.madeIn?.title}</span>
        </p>
      </div>
      <div className={cn("cell")}>
        <p className={cn("category")}>
          Категория: <span>{item.category?.title}</span>
        </p>
      </div>
      <div className={cn("cell")}>
        <p className={cn("year")}>
          Год выпуска: <span>{item.edition}</span>
        </p>
      </div>
      <div className={cn("cell")}>
        <p className={cn("price")}>
          Цена: <span>{numberFormat(item.price)} ₽</span>
        </p>
      </div>
      <div className={cn("cell")}>
        <button onClick={() => onAdd(item._id)} className={cn("button")}>
          Добавить
        </button>
      </div>
    </div>
  );
}

ItemDetails.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
  }),
  onAdd: PropTypes.func,
};

ItemDetails.defaultProps = {
  item: {},
  onAdd: () => {},
};

export default ItemDetails;
