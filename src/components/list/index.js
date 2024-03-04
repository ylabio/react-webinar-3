import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, totalPrice, addToCart, deleteFromCart}) {
  return (
    addToCart ? 
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} addToCart={addToCart}/>
        </div>
      )}
    </div> :
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} deleteFromCart={deleteFromCart}/>
        </div>
      )}
      <div className="List-summary">
        <strong>
          <span className="List-summary__title">Итого</span>
          <span className="List-summary__sum">{new Intl.NumberFormat('ru-RU', {style: 'currency', maximumFractionDigits: 0, currency: 'RUB'} ).format(totalPrice)}</span>
        </strong>
      </div>
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  totalPrice: PropTypes.number,
  deleteFromCart: PropTypes.func,
  addToCart: PropTypes.func,
};

List.defaultProps = {
  deleteFromCart: () => {},
  addToCart: () => {},
}

export default React.memo(List);
