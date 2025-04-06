import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, translations } from '../../utils';
import './style.css';

function BasketTotal({ sum = 0, language }) {
  const cn = bem('BasketTotal');
  const listTransfers = translations[language];
  return (
    <div className={cn()}>
      <span className={cn('cell')}>Итого</span>
      <span className={cn('cell')}> {listTransfers.total}: {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
  language: PropTypes.string.isRequired,
};

export default memo(BasketTotal);
