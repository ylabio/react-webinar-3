import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function List({list, render}) {
  return (
    <div>{
      list.map(item => {
        return(
          <div key={item.code} className='List_item'>
            {render(item)}
          </div>)
      })}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.array.isRequired,
  render: PropTypes.func.isRequired,
};

export default React.memo(List);
