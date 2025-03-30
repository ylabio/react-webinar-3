import React from 'react';
import PropTypes from 'prop-types';
import Row from '../row'
import './style.css';

function Table({ cart, onDeleteItem = () => {}}) {
  return (
    <table className="Table">
      <tbody>
        {cart.products.map(item => (
          <Row 
            key={item.code} 
            item={item} 
            onDeleteItem={onDeleteItem}
          />
        ))}
      </tbody>
      <tfoot className="Table-overview">
        <tr>
          <td className="Row-title"></td>
          <td className="Row-count">Итого: </td>
          <td className="Row-price">{cart.fullPrice.toLocaleString()} ₽</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
}

Table.propTypes = {
  cart: PropTypes.shape({
    products: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.number,
        title: PropTypes.string,
        price: PropTypes.number,
        count: PropTypes.number,
      })
    ),
    fullPrice: PropTypes.number,
  }).isRequired,
  onDeleteItem: PropTypes.func,
};

export default React.memo(Table);
