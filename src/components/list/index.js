import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function List({list, renderItem: Item, itemProps}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item {...{item, ...itemProps}}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  renderItem: PropTypes.object.isRequired,
  itemProps: PropTypes.object
};

List.defaultProps = {
  itemProps: {}
};

export default React.memo(List);
