import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function List({list, renderItem}){
  return (
    <div className='List'>{
      list.map(item =>
        renderItem(item)
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired
};

List.defaultProps = {
  onBtnClick: () => {},
}

export default React.memo(List);
