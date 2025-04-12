import { memo, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CategorySelect({ options, value, onChange, size, text }) {
  const cn = bem('CategorySelect');

  const onSelect = useCallback(
    e => {
      onChange(e.target.value === 'all' ? null : e.target.value);
    },
    [onChange]
  );

  const renderOptions = useMemo(() => {
    return [
      <option key="all" value="all">Все</option>,
      ...options.map(category => (
        <option
          key={category._id}
          value={category._id}
          style={{ paddingLeft: `${category.level * 15}px` }}
        >
          {'-'.repeat(category.level)} {category.title}
        </option>
      ))
    ];
  }, [options]);

  return (
    <select
      className={cn({ size, text: !!text })}
      value={value || 'all'}
      onChange={onSelect}
    >
      {renderOptions}
    </select>
  );
}

CategorySelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      level: PropTypes.number.isRequired
    })
  ).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium']),
  text: PropTypes.bool
};

export default memo(CategorySelect);