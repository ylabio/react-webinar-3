import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, onAddItem, onDeleteItem, buttonText}) {
  return (
    <div className='List'>{
      list.length > 0 && list.map(item =>
        <div key={item.code} className='List-item'>
          <Item buttonText={buttonText} item={item} onAddItem={onAddItem} onDelete={onDeleteItem}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onDeleteItem: PropTypes.func,
  onAddItem: PropTypes.func,
  buttonText: PropTypes.string
};

List.defaultProps = {
  onDeleteItem: () => {
  },
  onAddItem: () => {

  }
}

export default React.memo(List);
