import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, getItem}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          {/* <Item item={item} onAdd={onAddCart} text={'Добавить'}/> */}
          {getItem(item)}
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onAddCart: PropTypes.func,
  getItem: PropTypes.func,
};

List.defaultProps = {
  onAddCart: () => {
  }
}

export default React.memo(List);
