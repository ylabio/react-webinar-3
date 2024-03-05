import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, forAdd}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} forAdd={forAdd}/>
        </div>
      )}
    </div>
  )
}

// Typechecking with PropTypes:
List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  forAdd: PropTypes.func.isRequired,
};

// Default values for properties:
List.defaultProps = {
  forAdd: () => {},
}

export default React.memo(List);
