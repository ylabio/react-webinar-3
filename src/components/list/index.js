import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List(props) {
  return (
    <div className='List'>{
      props.list.map(item =>
        <div key={item.code} className='List-item'>
          <Item
              item={item}
              options={props.options}
              onAdd={props.onAddItem}
              onDelete={props.onDeleteItem}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  })).isRequired,
  options: PropTypes.shape({
    showCount: PropTypes.bool,
    isAppendable: PropTypes.bool,
    isDeletable: PropTypes.bool
  }),
  onAddItem: PropTypes.func,
  onDeleteItem: PropTypes.func
};

List.defaultProps = {
  options: {
    showCount: false,
    isAppendable: true,
    isDeletable: false
  },
  onAddItem: () => {
  },
  onDeleteItem: () => {
  },
}

export default React.memo(List);
