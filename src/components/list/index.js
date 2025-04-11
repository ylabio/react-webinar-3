import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function List({ list, renderItem }) {
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item._id} className="List-item">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      description: PropTypes.string,
    }),
  ).isRequired,
  renderItem: PropTypes.func.isRequired,
};

export default memo(List);
