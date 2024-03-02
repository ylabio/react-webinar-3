import React from "react";
import PropTypes from "prop-types";
import {numberFormat} from "../../utils";
import './style.css';

/**
 * Товар - элемент списка товаров
 * Через параметр options можно настраивать функциональность компонента
 */
function Item(props) {

  const callbacks = {
    onAdd: () => {
      props.onAdd(props.item.code);
    },
    onDelete: () => {
      props.onDelete(props.item.code);
    }
  }

  return (
    <tr className='Item'>
      <td className='Item-code'>{props.item.code}</td>
      <td className='Item-title'>{props.item.title}</td>
      <td className='Item-price'>{numberFormat(props.item.price)}</td>
      { props.options.showCount && <td className='Item-count'>
          {numberFormat(props.item.count, 'decimal', 0) + "\u00a0шт"}
        </td>
      }
      <td className='Item-actions'>
        { props.options.isAppendable && <button onClick={callbacks.onAdd}>
            Добавить
          </button>
        }
        { props.options.isDeletable && <button onClick={callbacks.onDelete}>
            Удалить
          </button>
        }
      </td>
    </tr>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  //  Настройки для отображения
  options: PropTypes.shape({
    showCount: PropTypes.bool,      // Отображать количество товара в корзине
    isAppendable: PropTypes.bool,   // Отображать кнокпу для добавления товара в корзину
    isDeletable: PropTypes.bool     // Отображать кнопку для удаления товара из корзины
  }),
  onAdd: PropTypes.func,
  onDelete: PropTypes.func
};

Item.defaultProps = {
  options: {
    showCount: false,
    isAppendable: true,
    isDeletable: false
  },
  onAdd: () => {},
  onDelete: () => {}
}

export default React.memo(Item);
