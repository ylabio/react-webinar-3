import React, { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import "./style.css";
import { propTypes } from "prop-types";
import PropTypes from "prop-types";

const ItemArticle = (props) => {
  const cn = bem("ItemArticle");
  const callbacks = {
    onAdd: () => props.onAdd(props.item._id),
  };
  return (
    <div className={cn()}>
      {Object.keys(props.item).length && (
        <>
          <p className={cn("text")}>{` ${props.item.description}`}</p>
          <p className={cn("text")}>
            Страна производитель:
            <span
              className={cn("subText")}
            >{` ${props.item.madeIn.title}`}</span>
          </p>
          <p className={cn("text")}>
            Категория:
            <span
              className={cn("subText")}
            >{` ${props.item.category.title}`}</span>
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
        </>
      )}
    </div>
  );
};

ItemArticle.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    dateCreate: PropTypes.string,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
    }),
    category: PropTypes.shape({
      title: PropTypes.string,
    }),
    price: PropTypes.number,
  }),
};

ItemArticle.defaultProps = {
  onAdd: () => {},
};

export default memo(ItemArticle);
