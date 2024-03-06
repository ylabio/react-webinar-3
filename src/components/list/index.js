import React, { Children } from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List(props) {
  return (
    <div className='List'>
      { props.list.map(item =>
          React.cloneElement(props.itemChildren,{item : item, onClick : props.onButtonClickHandler,key : item.code})
          )}
    </div>
  )
}


List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number.isRequired
  })).isRequired,
  onButtonClickHandler : PropTypes.func.isRequired
}

List.defaultProps = {
  onButtonClickHandler: () => {
  },
}

export default React.memo(List);
