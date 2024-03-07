import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, onDeleteItem, isModal, onAddCart}) {
  return (
    <div className='List'>
      {list ?
        list.map(item =>
        <div key={item.code} className='List-item'>
          {isModal
            ? <Item item={item} onDelete={onDeleteItem} isModal/>
            : <Item item={item} onAdd={onAddCart}/>
          }
        </div>
      )
        : <div>Empty</div>
      }
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onDeleteItem: PropTypes.func,
  isModal: PropTypes.bool,
  onAddCart: PropTypes.func
};

List.defaultProps = {
  onDeleteItem: () => {
  },
  onAddCart: () => {

  }
}

export default React.memo(List);
