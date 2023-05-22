import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import ItemModal from "../item-modal";
import './style.css';

function List({list, modal}) {
  return (
    <div className='List'> {
      list.map((item, i) =>
        <div key={item.code} className='List-item'>
          {modal ? <ItemModal item={item} index={i}/> : <Item item={item} index={i}/>}
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  modal: PropTypes.bool,
};

export default React.memo(List);
