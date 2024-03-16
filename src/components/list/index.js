import {memo} from "react";
import PropTypes from 'prop-types';
import Paginate from "../pagination";
import './style.css';

function List({list, listLength = 0, limit = 10, renderItem, setSkip}) {

  return (
    <>
      <div className='List'>{
        list.map(item =>
          <div key={item._id} className='List-item'>
            {renderItem(item)}
          </div>
        )}
      </div>
      {listLength > 0 && <Paginate listLength={listLength} limit={limit} setSkip={setSkip}/>}
    </>
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
