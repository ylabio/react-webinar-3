import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';

function BasketTotal({ sum = 0, language, totalTitle }) {
  const cn = bem('BasketTotal');
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{totalTitle}</span>
      <span className={cn('cell')}> {numberFormat(sum, language)} </span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
  language: PropTypes.string,
  totalTitle: PropTypes.string,
};

export default memo(BasketTotal);
