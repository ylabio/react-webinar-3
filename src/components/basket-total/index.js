import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';
import { useTranslation } from '../../translation/TranslationContext';

function BasketTotal({ sum = 0 }) {
  const cn = bem('BasketTotal');
  const { t } = useTranslation();

  return (
    <div className={cn()}>
      <span className={cn('cell')}>{t('cartTotal')}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
};

export default memo(BasketTotal);
