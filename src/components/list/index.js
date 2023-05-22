import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({
  list,
  onButtonClick,
  itemButtonText
}) {
  return (
    <div className='list'>{
      list.map(item =>
        <div key={item.code} className='list__item'>
          <Item item={item} onButtonClick={onButtonClick} itemButtonText={itemButtonText} />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onButtonClick: PropTypes.func,
  itemButtonText: PropTypes.string
};

List.defaultProps = {
  list: [],
  onButtonClick: () => { },
  itemButtonText: '',
}

export default React.memo(List);
