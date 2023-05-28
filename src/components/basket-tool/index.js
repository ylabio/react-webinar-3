import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';
import useTranslate from '../../store/use-translate';

function BasketTool({ sum, amount, onOpen, btn }) {
  const t = useTranslate();
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{t('inCart')}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(
              amount,
              {
                one: `${t('product1')}`,
                few: `${t('product2')}`,
                many: 'товаров',
                other: `${t('product2')}`,
              },
              t('getLocale', true)
            )} / ${numberFormat(sum)} ₽`
          : `${t('empty')}`}
      </span>
      <button className={cn('btn', { [btn]: true })} onClick={onOpen}>
        {t('go')}
      </button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  btn: PropTypes.string,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
