import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function List({list, elem, onClick}){
  return (
    <div className='List'>
      {list.map(item =>
        <div key={item.code} className='List-item'>
          {React.cloneElement(elem, { item, onClick })}
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  elem: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

List.defaultProps = {
  onClick: () => {},
}

export default React.memo(List);
