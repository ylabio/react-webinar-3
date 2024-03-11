import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import "./style.css";

function Item(props) {
  const cn = bem("Card-Item");

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id),
  };

  return (
    <div className={cn()}>
      <div className={cn("title")}>
        Описание товара из множества букв. Описание товара из букв. В АПИ может
        быть меньше букв. Описание товара из множества букв.
      </div>
      <div className={cn("title")}>
        Страна производитель: <b> Россия (RU)</b>
      </div>
      <div className={cn("title")}>
        Категория: <b>Электронника123a</b>
      </div>
      <div className={cn("title")}>
        Год выпуска: <b>2015</b>
      </div>
      <h2 className={cn("title")}>Цена: {`numberFormat(props.item.price)`}</h2>
      <div className={cn("title")}>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
};

export default memo(Item);
