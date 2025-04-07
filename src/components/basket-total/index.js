import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import { STRINGS } from '../../const';
import { useAppContext } from '../../app-context';
import './style.css';

function BasketTotal({ sum = 0, total }) {
  const cn = bem('BasketTotal');
  const { language } = useAppContext();

  return (
    <div className={cn()}>
      <span className={cn('cell')}>{total}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
};

export default memo(BasketTotal);
