import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({ list, callback }) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} callback={callback} />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  callback: PropTypes.func,
};

List.defaultProps = {
  callback: () => {
  },
}

export default React.memo(List);
