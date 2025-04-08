import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';

function BasketTotal({ sum = 0, totalText }) {
  const cn = bem('BasketTotal');
  
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{totalText}</span>
      <span className={cn('cell')}>
          {numberFormat(
            sum,
            undefined,
            { maximumFractionDigits: 0 }
          )} ₽
        </span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
  totalText: PropTypes.string.isRequired
};

export default memo(BasketTotal);