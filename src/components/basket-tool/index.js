import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import Cart from '../../assets/icon/cart.svg';
import { useTranslation } from '../../translation/use-translation';
import './style.css';
import BackButton from '../back-button';

function BasketTool(props) {
  const { onOpen = () => {}, sum = 0, amount = 0 } = props;
  const { t, language } = useTranslation();

  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <BackButton />
      <button className={cn('action')} onClick={onOpen}>
        <Cart className={cn('icon')} />
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
                one: language === 'ru' ? 'товар' : 'item',
                few: language === 'ru' ? 'товара' : 'items',
                many: language === 'ru' ? 'товаров' : 'items',
              })} / ${numberFormat(sum)} ₽`
            : t('empty')}
        </span>
      </button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

export default memo(BasketTool);
