import React from "react";
import PropTypes from "prop-types";
import Button from "../button";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { formatCurrency } from "../../utils";

/**
 *  Функция для создания элемента списка
 * @param {Object} props - объект пропсов
 * @param {Object} props.item - Объект с информацией о товаре
 * @param {Function} props.buttonFunction - функция для передачи кнопке
 * @param {String} props.buttonTitle - надпись на кнопке внутри элемента списка
 * @returns разметка
 */
function Item(props) {
  const cn = bem("Item");

  /**
   * функция которая сработает при клике на кнопку
   * @event {*} e - событие
   */
  const onButtonClick = (e) => {
    e.stopPropagation();
    props.buttonFunction(props.item.code);
  };

  return (
    <div className={cn()}>
      <div className={cn("code")}>{props.item.code}</div>
      <div className={cn("title")}>{props.item.title}</div>
      <div className={cn("price")}>{`${formatCurrency(props.item.price)}`}</div>
      {props.item.count &&
        <div className={cn("count")}>{`${props.item.count} шт`}</div>
      }
      <div className={cn("actions")}>
        <Button title={props.buttonTitle} buttonFunction={onButtonClick} />
      </div>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    count: PropTypes.number,
  }).isRequired,
  buttonFunction: PropTypes.func.isRequired,
  buttonTitle: PropTypes.string,
};

Item.defaultProps = {
  buttonTitle: 'Кнопка',
};

export default React.memo(Item);
