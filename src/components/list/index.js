import { memo } from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list = [], renderItem = item => {}, renderPagination }) {

  return (
    <>
      <ul className="List">
        {list.map(item => (
          <li key={item._id} className="List-item">
            {renderItem(item)}
          </li>
        ))}
      </ul>
      {renderPagination}
    </>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ).isRequired,
  renderItem: PropTypes.func,
  renderPagination: PropTypes.object,
};

export default memo(List);
