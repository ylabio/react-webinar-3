import React from "react";
import PropTypes, {string} from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, actionItem}){

  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item
            item={item}
            actionItem={actionItem}
          />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  actionItem: string.isRequired,
};

List.defaultProps = {
  list: [],
  actionItem: null
}

export default React.memo(List);
