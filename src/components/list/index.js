import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function List({ list = [], onClick, children }) {
  return (
    <div className='List'>
      {list.map(item => (
        <div key={item.code} className='List-item'>
          {React.Children.map(children, child => {
            return React.cloneElement(child, { item, onClick });
          })}
        </div>
      ))}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    quantity: PropTypes.number,
  })).isRequired,
  onClick: PropTypes.func,
};

List.defaultProps = {
  onClick: () => {
  },
  list: [],
}

export default React.memo(List);
