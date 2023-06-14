import {memo} from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, renderItem, needWrapping = true}){
  return (
    <div className='List'>{
      list.map((item, i, array) =>
        needWrapping ? (
          <div key={item._id} className='List-item'>
            {renderItem(item, i, array)}
          </div>
        ) : (
          renderItem(item, i, array)
        )
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })).isRequired,
  renderItem: PropTypes.func,
};

List.defaultProps = {
  renderItem: (item) => {},
}

export default memo(List);
