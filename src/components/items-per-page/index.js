import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import useTranslation from '../../hooks/use-translation';
import './style.css';

function ItemsPerPage({ value = 10, onChange }) {
  const cn = bem('ItemsPerPage');
  const { t } = useTranslation();

  const callbacks = {
    onChange: useCallback(e => onChange(Number(e.target.value)), [onChange]),
  };

  return (
    <div className={cn()}>
      <span className={cn('label')}>{t('itemsPerPage')}:</span>
      <select className={cn('select')} value={value} onChange={callbacks.onChange}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
    </div>
  );
}

ItemsPerPage.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default memo(ItemsPerPage); 