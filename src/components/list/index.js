import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List(props){
  return (
    <div className='List'>
      {props.items.map(props.renderItem)}
    </div>
  )
}

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  renderItem: PropTypes.func.isRequired,};


export default React.memo(List);
