import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function List({list, ItemComp, handleControl}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <ItemComp item={item} handleControl={handleControl}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  // ItemComp: PropTypes.node,
  handleControl: PropTypes.func
};

export default React.memo(List);
