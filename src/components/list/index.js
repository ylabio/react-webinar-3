import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, onClick, isInBasket}) {
  return (
    <div className={isInBasket ? "List mt-71" :"List"}>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item isInBasket={isInBasket} item={item} onClick={onClick}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onDeleteItem: PropTypes.func,
  onClick: PropTypes.func
};

List.defaultProps = {
  onDeleteItem: () => {
  },
  onClick: () => {
  },
}

export default React.memo(List);
