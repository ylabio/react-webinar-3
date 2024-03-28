import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import './style.css';

function BasketTotal({sum, translate}) {
  const cn = bem('BasketTotal');
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{translate('basket.total')}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
  translate: PropTypes.func
};

BasketTotal.defaultProps = {
  sum: 0,
  translate: (text) => text
}

export default memo(BasketTotal);
