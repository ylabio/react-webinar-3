import React from "react";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import "./style.css";

const ItemArticle = (props) => {
  const cn = bem("ItemArticle");
  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id),
  };
  console.log(props.item);
  return (
    <div className={cn()}>
      <p className={cn("text")}>{` ${props.item.description}`}</p>
      <p className={cn("text")}>
        Страна производитель:
        <span className={cn("subText")}>{` ${props.item.madeIn?._id}`}</span>
      </p>
      <p className={cn("text")}>
        Категория:
        <span className={cn("subText")}>{` ${props.item.category?._id}`}</span>
      </p>
      <p className={cn("text")}>
        Год выпуска:
        <span className={cn("subText")}>
          {` ${new Date(props.item.dateCreate).getFullYear()}`}
        </span>
      </p>
      <p className={cn("price")}>
        {`Цена: ${numberFormat(props.item.price)} ₽`}{" "}
      </p>
      <button onClick={callbacks.onAdd}>Добавить</button>
    </div>
  );
};

export default ItemArticle;
