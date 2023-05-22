import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, listFunction, listTitle}) {

  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} itemFunction={listFunction} itemTitle={listTitle}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  listFunction: PropTypes.func,
  listTitle: PropTypes.string
};

List.defaultProps = {
  listFunction: () => {
  },
}

export default React.memo(List);
