import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Row({ item, onDeleteItem = () => {} }) {
  const callbacks = {
    onDeleteItem: e => {
      e.stopPropagation();
      onDeleteItem(item.code);
    },
  };

  return (
    <tr className="Row">
      <td className="Row-title">{item.title}</td>
      <td className="Row-count">{item.count} шт</td>
      <td className="Row-price">{item.price.toLocaleString()} ₽</td>
      <td> 
        <button onClick={callbacks.onDeleteItem}>Удалить</button>
      </td>
    </tr>
  );
}

Row.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
  }).isRequired,
  onDeleteItem: PropTypes.func,
};

export default React.memo(Row);