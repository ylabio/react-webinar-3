import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function LadderList({
                      list,
                      renderItem = item => {},
                      indentMaxPx = 40,
                      maxLevel = 15
                    }) {

  function clampLevel(level) {
    const safeLevel = typeof level === 'number' ? level : 0;
    return Math.max(0, Math.min(safeLevel, maxLevel));
  }


  return (
    <ul className="LadderList">
      {list.map(item => (
        <li
          key={item.value}
          className="LadderList-item"
          style={{
            '--level': clampLevel(item.level),
            '--indent': `${indentMaxPx}px`,
          }}
        >
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
  maxLevel: PropTypes.number,
  indentPercent: PropTypes.number,
  indentMaxPx: PropTypes.number,
};

export default memo(LadderList);
