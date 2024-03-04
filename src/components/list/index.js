import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, actionItem, buttonText, isModal}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} action={actionItem} buttonText={buttonText} isModal={isModal}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  actionItem: PropTypes.func,
  buttonText: PropTypes.string,
  isModal: PropTypes.bool
};

List.defaultProps = {
  actionItem: () => {
  },
  buttonText: '',
  isModal: false
}

export default React.memo(List);
