import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { NavLink } from 'react-router';
import Cart from '../../assets/icon/cart.svg';
import useSelector from '../../store/use-selector';
import { numberFormat, plural } from '../../utils';
import { translations } from '../../utils/translations';
import './style.css';

function BasketTool(props) {
  const { onOpen = () => {}, sum = 0, amount = 0 } = props;

  const cn = bem('BasketTool');
  const lang = useSelector(state => state.language.currentLanguage);
  const t = translations[lang] || translations.ru;

  return (
    <div className={cn()}>
      <NavLink className={cn('nav')} to="/" end>
        {t.MainNav}
      </NavLink>
      <button className={cn('action')} onClick={onOpen}>
        <Cart className={cn('icon')} />
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
                one: `${t.oneItem}`,
                few: `${t.fewItems}`,
                many: `${t.ManyItems}`,
              })} / ${numberFormat(sum)} ₽`
            : `${t.cartEmpty}`}
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
