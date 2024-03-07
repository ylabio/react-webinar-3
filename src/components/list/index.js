import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, buttonAction, buttonLabel}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item
          item={item}
          buttonAction={buttonAction}
          buttonLabel={buttonLabel}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  buttonAction: PropTypes.func,
  buttonLabel: PropTypes.string
};

List.defaultProps = {
  buttonAction: () => {},
}

export default React.memo(List);
