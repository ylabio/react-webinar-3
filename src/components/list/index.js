import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List(props) {
  return (
    <div className='List'>{
      props.list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} onAdd={props.onAdd} onSelect={props.onSelect}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onAdd: PropTypes.func,
  onSelect: PropTypes.func
};

List.defaultProps = {
  onAdd: () => {
  },
  onSelect: () => {
  },
}

export default React.memo(List);
