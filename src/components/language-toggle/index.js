import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function LanguageToggle({ onItemSumChange }) {
  const cn = bem('LanguageToggle');

  const handleChange = (event) => {
    onItemSumChange(Number(event.target.value));
  };

  return (
    <select className={cn()} onChange={handleChange} defaultValue="ru">
      <option value="ru">ru</option>
      <option value="en">en</option>
    </select>
  );
}

LanguageToggle.propTypes = {
  onItemSumChange: PropTypes.func.isRequired,
};

export default memo(LanguageToggle);
