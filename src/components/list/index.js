import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function List({list, typeItem}) {

  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          {typeItem(item)}
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onDelete: PropTypes.func,
  onAdd: PropTypes.func,
};

List.defaultProps = {
  onDelete: () => {
  },
  onAdd: () => {
  },
}

export default React.memo(List);
