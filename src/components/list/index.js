import './style.css';
import React from "react";
import PropTypes from 'prop-types';

function List({list, onBtnClick, buttonText, ListItem}) {
  return (
    <div className='List'>
      {list.map(item => (
        <div key={item.code} className='List-item'>
          <ListItem item={item} onBtnClickAction={onBtnClick} buttonText={buttonText}/>
        </div>
        // в этом случае мы получаем достаточно грязные элементы списка
        // но это дает нам гибкость и простоту использования списков с разными Item
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  ListItem: PropTypes.elementType.isRequired,
  buttonText: PropTypes.string,
  onBtnClick: PropTypes.func,
};

export default React.memo(List);
