import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Row(props) {
  const callbacks = {
    onDeleteItem: () => {
      props.onDeleteItem(props.item.code);
    },
  };

  return (
    <tr className="Row">
      <td className="Row-title">{props.item.title}</td>
      <td className="Row-count">{props.item.count} шт</td>
      <td className="Row-price">{props.item.price.toLocaleString()} ₽</td>
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

Row.defaultProps = {
  onAddToCart: () => {},
};

export default React.memo(Row);