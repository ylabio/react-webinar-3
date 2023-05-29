import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';
import useTranslation from '../../hooks/use-translation';

function BasketTool({ sum, amount, onOpen }) {
  const cn = bem('BasketTool');
  const { t } = useTranslation();
  return (
    <div className={cn()}>
      <span className={cn('label')}>{t('in cart')}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
              one: t('one item'),
              few: t('few items'),
              many: t('many items'),
            })} / ${numberFormat(sum)} ₽`
          : t('empty')}
      </span>
      <button onClick={onOpen}>{t('open cart button')}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
