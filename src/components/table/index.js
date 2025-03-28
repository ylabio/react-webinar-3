import React from 'react';
import PropTypes from 'prop-types';
import Row from '../row'
import './style.css';

function Table(props) {
  return (
    <table className="Table">
      <tbody>
        {props.cart.map(item => (
          <Row 
            key={item.code} 
            item={item} 
            onDeleteItem={props.onDeleteItem}
          />
        ))}
      </tbody>
      <tfoot className="Table-overview">
        <tr>
          <td className="Row-title"></td>
          <td className="Row-count">Итого: </td>
          <td className="Row-price">{props.sum.toLocaleString()} ₽</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
}

Table.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  sum: PropTypes.number,
  onDeleteItem: PropTypes.func,
};

Table.defaultProps = {
  onDeleteItem: () => {},
};

export default React.memo(Table);
