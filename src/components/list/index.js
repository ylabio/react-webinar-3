import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function List({ list, children, onActionWithItem }) {

  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          {React.Children.map(children, (child) =>
            React.cloneElement(child, {
              item: item,
              onActionWithItem: onActionWithItem
            })
          )}
        </div>
      )}
    </div>
  )
}
List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onActionWithItem: PropTypes.func,
  children: PropTypes.node
};

List.defaultProps = {
  onActionWithItem: () => { }
}

export default React.memo(List);
