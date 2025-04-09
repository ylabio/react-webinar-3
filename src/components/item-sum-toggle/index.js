import { memo, useContext  } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { LanguageContext } from '../../contexts/LanguageContext';
import { translations } from '../../locales';
import './style.css';

function ItemSumToggle({ onItemSumChange }) {
  const cn = bem('ItemSumToggle');
  const { language } = useContext(LanguageContext);

  const handleChange = (event) => {
    onItemSumChange(Number(event.target.value));
  };

  return (
    <div className={cn()}>
      {translations[language].itemSumToggleText}
      <select onChange={handleChange} defaultValue="5">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </div>
  );
}

ItemSumToggle.propTypes = {
  onItemSumChange: PropTypes.func.isRequired,
};

export default memo(ItemSumToggle);
