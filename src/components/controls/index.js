import React from 'react';
import './style.css';
import {plural} from "../../utils";
import PropTypes from "prop-types";

/**
 * Компонент кнопок
 * @param props {Object} Пропсы компонента
 * @param props.onClick {Function} Коллбек при клике
 * @param [props.style='add'] {('add' | 'remove' | 'order')} Стили кнопки (для добавления или удаления айтема)
 * @param [props.buttonText='Добавить'] {String} Текст внутри кнопки
 * @param [props.totalAmount] {String} Общая сумма
 * @param [props.order] {Number} Количество заказов
 * @param [props.Icon=OrderIcon] {React.ElementType} Компонен svg-иконки
 */

const Controls = ({
                    onClick,
                    style = 'add',
                    buttonText = 'Добавить',
                    totalAmount= '0',
                    order,
                    Icon
}) => {
  const className = `Controls-button-${style}`;
  console.log('controls')

  const pluralShipment = plural(order, {
    one: 'товар',
    few: 'товара',
    many: 'товаров',
  }, 'ru-RU');

  let content = order
    ? <>
        {order} {pluralShipment} / {totalAmount}
      </>
    : `${buttonText}`;

  return (
    <div className="Controls">
      <button onClick={onClick} className={className} >
        {order ? <Icon /> : null}
        {content}
      </button>
    </div>
  );
}

Controls.propTypes = {
  Icon: PropTypes.elementType,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.oneOf(['add', 'remove', 'order']).isRequired,
  buttonText: PropTypes.string.isRequired,
  totalAmount: PropTypes.string,
  order: PropTypes.number,
};

export default React.memo(Controls);
