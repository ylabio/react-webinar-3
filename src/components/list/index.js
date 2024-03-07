import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({ list, onСlickItem,titleButton}) {
    console.log(list);
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
              <Item item={item} onСlickItem={onСlickItem} title={titleButton}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
    onClickItem: PropTypes.func.isRequired
};

List.defaultProps = {
    onClickItem: () => { }
}

export default React.memo(List);
