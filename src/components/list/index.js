import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List(props) {
  return (
    <div className='List'>{
      props.list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} onClick={props.onButtonClickHandler} buttonContent = {props.itemButtonContent}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number.isRequired
  })).isRequired,
  onButtonClickHandler: PropTypes.func.isRequired,
  itemButtonContent: PropTypes.string.isRequired
};

List.defaultProps = {
  onButtonClickHandler: () => {
  },
  itemButtonContent: () => {
  },
}

export default React.memo(List);
