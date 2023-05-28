import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

function List({list, renderItem, loading, error}){
  return (
    <div className={'List'}>
      {list.map(item =>
        <div key={item._id} className='List-item'>
          {renderItem(item)}
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
  loading: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]),
  error: PropTypes.bool
};

List.defaultProps = {
  renderItem: (item) => {},
}

export default memo(List);
