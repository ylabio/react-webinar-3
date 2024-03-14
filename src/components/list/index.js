import { memo } from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({ list, renderItem, isLoading, error }) {
  if (error) return <p className="List-error List-loading">Sorry.. {error}</p>;
  return isLoading ? <p className="List-loading">Loading..</p> : <div className='List'>{
    list.map(item =>
      <div key={item._id} className='List-item'>
        {renderItem(item)}
      </div>
    )}
  </div>
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })).isRequired,
  renderItem: PropTypes.func,
  isLoading: PropTypes.bool
};

List.defaultProps = {
  renderItem: (item) => { },
}

export default memo(List);
