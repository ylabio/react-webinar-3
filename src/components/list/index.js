import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

function List({ list, renderItem, t }) {
  
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item._id} className='List-item'>
          {renderItem({ item, t })}
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })).isRequired,
  renderItem: PropTypes.func,
  t: PropTypes.func
};

List.defaultProps = {
  renderItem: (item) => {},
}

export default memo(List);
