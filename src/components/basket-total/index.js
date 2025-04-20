import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import useTranslate from '../../hooks/use-translate';
import './style.css';

function BasketTotal(props) {
  const { t } = useTranslate();

  const { sum = 0 } = props;
  const cn = bem('BasketTotal');
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{t('basket.total')}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
  t: PropTypes.func,
};

export default memo(BasketTotal);
