import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { useLanguage } from '../../language-context';
import translations from '../../locales';

function ItemsPerPageSelector({ perPage, onChange, children }) {
  const { language } = useLanguage();
  const t = translations[language];
  const cn = bem('ItemsPerPageSelector');
  const options = [5, 10, 20];

  const handleChange = useCallback((e) => {
    onChange(Number(e.target.value));
  }, [onChange]);

  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <label className={cn('label')}>{t.itemsPerPage}</label>
        <select className={cn('select')} value={perPage} onChange={handleChange}>
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {children}
      </div>
    </div>
  );
}

ItemsPerPageSelector.propTypes = {
  perPage: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default memo(ItemsPerPageSelector);
