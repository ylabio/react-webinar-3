import { memo } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import './style.css';

function List({ list, renderItem = () => {}, pagination }) {
  return (
    <ul className={pagination? "Pagination-list" : "List"}>
      {list.map(item => !pagination ? (
        <li key={item._id} className="List-item">
          {renderItem(item)}
        </li>
      ) : ( 
        renderItem(item)
      ))}
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(oneOfType([
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    PropTypes.number
  ])).isRequired,
  renderItem: PropTypes.func,
  pagination: PropTypes.bool,
};

export default memo(List);
