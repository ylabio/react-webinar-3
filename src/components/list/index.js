import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function List({ list, itemType }) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          {itemType(item)}
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  itemType: PropTypes.func,
};

List.defaultProps = {
  itemType: (item) => {
  }
}

export default React.memo(List);
