import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({type, list, callback, buttonTitle}) {
  const uniqueList = new Set(list);

  return (
    <div className='List'>{
      Array.from(uniqueList).map(item =>
        <div key={item.code} className='List-item'>
          <Item type={type} item={item} callback={callback} buttonTitle={buttonTitle}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  callback: PropTypes.func,
};

List.defaultProps = {
  callback: () => {
  },
}

export default React.memo(List);
