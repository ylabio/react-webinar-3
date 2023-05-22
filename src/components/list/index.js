import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({ list, onClick, title, isModalOpen }) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item title={title} item={item} onClick={onClick} isModalOpen={isModalOpen} />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onClick: PropTypes.func
};

List.defaultProps = {
  onClick: () => { },
}

export default React.memo(List);
