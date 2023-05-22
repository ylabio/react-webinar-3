import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function List(props) {
  return (
    <div className='List'>
      {props.list.map((item) => (
        <div key={item.code} className='List-item'>
          {props.children(item)}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      price: PropTypes.number,
    })
  ).isRequired,
};

export default React.memo(List);
