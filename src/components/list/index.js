import React, { useCallback, useState } from "react";
import PropTypes from 'prop-types';
import Item from "../item-main";
import './style.css';
import ItemCart from "../item-cart";

function List(props) {

  console.log("list")

  return (
    <div className='List'>{
      props.list.map(item =>
        (props.type === ItemCart && !item.count) ? null : 
          <div key={item.code} className='List-item'>
            <props.type item={item} show={props.show} onAddItem={props.onAddItem} onDeleteItem={props.onDeleteItem}/>
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
  onAddItem: PropTypes.func,
  show: PropTypes.arrayOf(PropTypes.string).isRequired,
};

List.defaultProps = {
  onDeleteItem: () => {
  },
  onAddItem: () => {
  },
};

export default React.memo(List);
