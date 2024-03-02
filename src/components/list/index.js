import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, callback, onSelectItem, buttonTitle}) {
  const uniqueList = new Set(list);

  return (
    <div className='List'>{
      Array.from(uniqueList).map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} callback={callback} onSelect={onSelectItem} buttonTitle={buttonTitle}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  // onDeleteItem: PropTypes.func,
  onSelectItem: PropTypes.func,
  callback: PropTypes.func,
};

List.defaultProps = {
  // onDeleteItem: () => {
  // },
  onSelectItem: () => {
  },
  callback: () => {
  },
}

export default React.memo(List);
