import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function List({list, viewItem}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          {viewItem(item)}
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  viewItem: PropTypes.func
};

List.defaultProps = {
  viewItem: (item) => {},
}

export default React.memo(List);
