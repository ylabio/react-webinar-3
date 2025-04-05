import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import Cart from '../../assets/icon/cart.svg';
import './style.css';
import { NavLink } from 'react-router';
import { useTranslate } from '../../locales/use-translate';
import { useLocale } from '../../locales/use-locale';

function BasketTool(props) {
  const { onOpen = () => { }, sum = 0, amount = 0 } = props;
  const locale = useLocale();
  const t = useTranslate();

  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <NavLink to="/" className={cn('link')}>{t.main}</NavLink>
      <button className={cn('action')} onClick={onOpen}>
        <Cart className={cn('icon')} />
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, locale === 'en'
              ? { one: 'item', other: 'items' }
              : { one: 'товар', few: 'товара', many: 'товаров' }, locale)} / ${numberFormat(sum)} ₽`
            : t.empty}
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
