import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import "./style.css";

function CardItem(props) {
  const cn = bem("Card-Item");
  console.log(props.item);

  const callbacks = {
    onAdd: (e) => props.onAdd(),
  };

  return (
    <div className={cn()}>
      <div className={cn("title")}>{props.item?.description}</div>
      <div className={cn("title")}>
        Страна производитель:{" "}
        <b>
          {props.item?.madeIn?.title} ({props.item?.madeIn?.code})
        </b>
      </div>
      <div className={cn("title")}>
        Категория: <b>{props.item?.category?.title}</b>
      </div>
      <div className={cn("title")}>
        Год выпуска: <b>{props.item?.edition}</b>
      </div>
      <h2 className={cn("title")}>Цена: {numberFormat(props.item?.price)} ₽</h2>
      <div className={cn("title")}>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  );
}

CardItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
    edition: PropTypes.number,
    price: PropTypes.number,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
    }),
    category: PropTypes.shape({
      title: PropTypes.string,
    }),
  }).isRequired,
  onAdd: PropTypes.func,
};

CardItem.defaultProps = {
  onAdd: () => {},
};

export default memo(CardItem);
