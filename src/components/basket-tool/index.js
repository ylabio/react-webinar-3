import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import { useTranslation } from '../../hooks/useTranslation';
import Cart from '../../assets/icon/cart.svg';
import './style.css';

function BasketTool({ onOpen = () => {}, sum = 0, amount = 0, main = 'main', onMain = () => {} }) {
  const cn = bem('BasketTool');
  const { t } = useTranslation();

  return (
    <div className={cn()}>
      <div className={cn('link')} onClick={onMain}>
        {t(main)}
      </div>
      <button className={cn('action')} onClick={onOpen}>
        <Cart className={cn('icon')} />
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
                one: t('item-one'),
                few: t('item-few'),
                many: t('item-many'),
              })} / ${numberFormat(sum)} ₽`
            : t('cart-empty')}
        </span>
      </button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func,
  sum: PropTypes.number,
  amount: PropTypes.number,
  main: PropTypes.string,
  onMain: PropTypes.func
};

export default memo(BasketTool);
