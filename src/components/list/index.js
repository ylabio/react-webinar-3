import React from "react";
import PropTypes from 'prop-types';
import Item from './item';
import { numberFormat } from '../../utils';
import './style.css';

/**
 * Список товаров
 * Через параметр options можно настраивать функциональность списка
 */
function List(props) {
  return (
    <table className='List'>
      <tbody>{
        props.list.map(item =>
          <Item key={item.code}
                item={item}
                options={props.options}
                onAdd={props.onAddItem}
                onDelete={props.onDeleteItem}/>
        )}
        { props.options.showTotals &&
            <tr key='list-footer' className='List-footer'>
              <td className='List-totals' colSpan={3}>Итого</td>
              <td className='List-price'>{
                numberFormat(props.list.reduce((sum, current) => sum + current.price * current.count, 0)) }
              </td>
              <td></td>
            </tr>
        }
      </tbody>
    </table>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.number,
    count: PropTypes.number
  })).isRequired,
  //  Настройки для отображения списка
  options: PropTypes.shape({
    showCount: PropTypes.bool,      // Отображать количество товара в корзине
    showTotals: PropTypes.bool,     // Отображать итоговую строку с суммой корзины
    isAppendable: PropTypes.bool,   // Отображать кнокпи для добавления товаров в корзину
    isDeletable: PropTypes.bool     // Отображать кнопки для удаления товаров из корзины
  }),
  onAddItem: PropTypes.func,
  onDeleteItem: PropTypes.func
};

List.defaultProps = {
  options: {
    showCount: false,
    showTotals: false,
    isAppendable: true,
    isDeletable: false
  },
  onAddItem: () => {
  },
  onDeleteItem: () => {
  },
}

export default React.memo(List);
