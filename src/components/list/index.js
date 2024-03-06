import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function List({list, onButtonAction,children}) {
  return (
    <div className='List'>{
      list.map(item => {
        children = React.cloneElement(children, {
          item: item,
          onButtonAction:onButtonAction
        })
        return(
          <div key={item.code} className='List-item'>
            {children}
          </div>
        )})}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onButtonAction: PropTypes.func,
};

List.defaultProps = {
  onButtonAction: () => {
  },
}

export default React.memo(List);
