import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';
import ItemBasket from "../itemBasket";

function List(props) {

  const Items = props.Items

  return (
    <div className='List'>{
      props.list.map(item =>
        <div key = {item.code} className='List-item'>
          {/* <Item item={item} onFunc={props.onFunc} button={props.button}/> */}
          {Items !== undefined ? <Items props2={props} item = {item}></Items> : ''}
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onDeleteItem: PropTypes.func,
  onSelectItem: PropTypes.func
};

List.defaultProps = {
  onDeleteItem: () => {
  },
  onSelectItem: () => {
  },
}

export default React.memo(List);
