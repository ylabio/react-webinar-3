import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function List({ list, onAction, ItemComponent }) {

  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <ItemComponent item={item} onAction={() => onAction(item.code)} />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  ItemComponent: PropTypes.elementType.isRequired
};

List.defaultProps = {
  list: []
}

export default React.memo(List);
