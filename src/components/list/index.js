import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({list, amounts, ...handlers}) {
  return (
    <div>{
      list.map(item => {
        const amount = amounts ? amounts[item.code] : undefined;
        return(
          <div key={item.code} className='List-item'>
            <Item item={item} amount={amount} {...handlers}/>
          </div>)
      })}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.exact({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  })).isRequired,
  amounts: PropTypes.objectOf(PropTypes.number),
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
};

export default React.memo(List);
