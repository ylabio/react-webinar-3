import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, buttonText, onClick}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} onClick={onClick} buttonText={buttonText} />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  buttonText: PropTypes.string,
  onClick: PropTypes.func
};

List.defaultProps = {
  buttonText: 'Нажать',
  onClick: () => {
  }
}

export default React.memo(List);
