import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function List({list, onClickItem, renderListItems}) {
  return (
    <div className='List'>
      {list.map(item =>
        <div key={item.code} className='List-item'>{renderListItems(item, onClickItem)}</div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onClickItem: PropTypes.func,
  renderListItems: PropTypes.func
};

List.defaultProps = {
  onClickItem: () => { },
  renderListItems: () => { }
}

export default React.memo(List);
