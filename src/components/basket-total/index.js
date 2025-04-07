import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';

function BasketTotal({ sum = 0 ,totalMessage}) {

  const cn = bem('BasketTotal');


  return (
    <div className={cn()}>
      <span className={cn('cell')}>{totalMessage}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
  totalMessage: PropTypes.string
};

export default memo(BasketTotal);
