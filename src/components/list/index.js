import React, { useCallback, useState } from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List(props) {

  console.log("list")

  return (
    <div className='List'>{
      props.list.map(item =>
        (props.show.includes('count') && !item.count) ? null : 
          <div key={item.code} className='List-item'>
            <Item item={item} show={props.show} onAddItem={props.onAddItem} onDeleteItem={props.onDeleteItem}/>
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
