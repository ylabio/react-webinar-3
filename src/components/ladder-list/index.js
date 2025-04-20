import { memo, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function LadderList({
                      list,
                      renderItem = item => {},
                      indentPercent = 4,
                      indentMaxPx = 40,
                      maxLevel = 20
                    }) {
  const listRef = useRef(null);
  const [calculatedIndent, setCalculatedIndent] = useState(0);

  function clampLevel(level) {
    const safeLevel = typeof level === 'number' ? level : 0;
    return Math.max(0, Math.min(safeLevel, maxLevel));
  }

  useEffect(() => {
    function updateIndent() {
      if (!listRef.current) return;

      const containerWidth = listRef.current.offsetWidth;
      const indentFromPercent = (containerWidth * indentPercent) / 100;
      const finalIndent = Math.min(indentFromPercent, indentMaxPx);

      setCalculatedIndent(finalIndent);
    }

    updateIndent();
    window.addEventListener('resize', updateIndent);
    return () => window.removeEventListener('resize', updateIndent);
  }, [indentPercent, indentMaxPx]);

  return (
    <ul className="LadderList" ref={listRef}>
      {list.map(item => (
        <li
          key={item.value}
          className="LadderList-item"
          style={{
            '--level': clampLevel(item.level),
            '--indent': `${calculatedIndent}px`,
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
