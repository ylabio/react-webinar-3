import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function List({list, children}){
  return (
      <div className='List'>{
        list.map(item =>
          <div key={item.code} className='List-item'>
            {React.cloneElement(children, {item})}
          </div>
        )}
      </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count:PropTypes.number
  })).isRequired,
  children: PropTypes.element,
};

export default React.memo(List);
