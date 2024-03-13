import React from "react";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import PropTypes from "prop-types";

import "./style.css";

function ItemCard({ item, onAdd }) {
  const cn = bem("ItemCard");

  const callbacks = {
    onAdd: () => onAdd(item._id),
  };

  return (
    <div className={cn()}>
      <ul className={cn("list")}>
        <li className={cn("description")}>{item.description}</li>
        <li>
          Страна производитель:&nbsp;
          <span>
            {item.madeIn.title} ({item.madeIn.code})
          </span>
        </li>
        <li className={cn("category")}>
          Категория:&nbsp;<span>{item.category.title}</span>
        </li>
        <li className={cn("edition")}>
          Год выпуска:&nbsp;<span>{item.edition}</span>
        </li>
        <li className={cn("price")}>
          Цена:&nbsp;
          {numberFormat(item.price, undefined, {
            style: "currency",
            currency: "RUB",
          })}
        </li>
      </ul>
      <button type="button" onClick={callbacks.onAdd} className={cn("addBtn")}>
        Добавить
      </button>
    </div>
  );
}

ItemCard.propTypes = {
  item: PropTypes.shape({
    description: PropTypes.string,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
    }),
    category: PropTypes.shape({
      title: PropTypes.string,
    }),
    price: PropTypes.number,
    edition: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

ItemCard.defaultProps = {
  onAdd: () => {},
};

export default React.memo(ItemCard);
