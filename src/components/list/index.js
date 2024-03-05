import React from "react";
import PropTypes from 'prop-types';
import Item from './item';

/**
 * Список товаров
 * Через параметр options можно настраивать функциональность списка
 */
function List(props) {
  return (
    <div>
      {
        props.list.map(item =>
          <Item key={item.code}
                item={item}
                options={props.options}
                onAdd={props.onAddItem}
                onDelete={props.onDeleteItem}/>
        )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number
  })).isRequired,
  //  Настройки для отображения списка
  options: PropTypes.shape({
    showCount: PropTypes.bool,      // Отображать количество товара в корзине
    isAppendable: PropTypes.bool,   // Отображать кнокпи для добавления товаров в корзину
    isDeletable: PropTypes.bool     // Отображать кнопки для удаления товаров из корзины
  }),
  onAddItem: PropTypes.func,
  onDeleteItem: PropTypes.func
};

List.defaultProps = {
  options: {
    showCount: false,
    isAppendable: true,
    isDeletable: false
  },
  onAddItem: () => {
  },
  onDeleteItem: () => {
  },
}

export default React.memo(List);
