import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function LadderList({ list, renderItem = item => {} }) {
  return (
    <ul className="LadderList">
      {list.map(item => (
        <li style={{'--level': item.level}} key={item.value} className="LadderList-item">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

LadderList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      level: PropTypes.number,
    }),
  ).isRequired,
  renderItem: PropTypes.func.isRequired,
};

export default memo(LadderList);
