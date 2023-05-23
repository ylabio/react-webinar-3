import React, {useCallback, useState} from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props){
  return (
    <div className={'Item' + (props.item.selected ? ' Item_selected' : '')}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      {
        props.children
      }

    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number
  }).isRequired,
  setBasket: PropTypes.func
};


Item.defaultProps = {
    setBasket: () => {}
}
export default React.memo(Item);
