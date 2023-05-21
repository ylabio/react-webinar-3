import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, handleClick, buttonName, active}){
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} handleClick={handleClick} buttonName={buttonName} active={active}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  handleClick: PropTypes.func,
  active: PropTypes.bool,
  buttonName: PropTypes.string,
};

List.defaultProps = {
  handleClick: () => {},
}

export default React.memo(List);
