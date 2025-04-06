import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';
import useTranslation from '../../store/lang/use-translat';

function BasketTotal({ sum = 0 }) {
  const cn = bem('BasketTotal');
  const { t } = useTranslation();
  const langAmount = t('basketTool').amount;

  return (
    <div className={cn()}>
      <span className={cn('cell')}>{langAmount}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
};

export default memo(BasketTotal);
