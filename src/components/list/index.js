import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({ list = [], onClick, action }) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} onClick={onClick} action={action} />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onClick: PropTypes.func,
  action: PropTypes.string,
};

List.defaultProps = {
  onClick: () => {
  },
  list: [],
}

export default React.memo(List);
