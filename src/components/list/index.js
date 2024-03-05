import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function List({ list, Item, btn }) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} btn={btn} />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  btn: PropTypes.object,
};

export default React.memo(List);
