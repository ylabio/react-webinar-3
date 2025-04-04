import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import Cart from '../../assets/icon/cart.svg';
import './style.css';
import { NavLink } from 'react-router';
import useSelector from '../../store/use-selector';
import { translate } from '../../utils';

function BasketTool(props) {
  const { onOpen = () => {}, sum = 0, amount = 0 } = props;

  const cn = bem('BasketTool');
  const lang = useSelector(state => state.language.language);
  const translation = translate[lang];
  
  return (
    <div className={cn()}>
      <NavLink className={cn('nav')} to="/">
        {translation.basketToolNav}
      </NavLink>
      <button className={cn('action')} onClick={onOpen}>
        <Cart className={cn('icon')} />
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
                one: `${translation.one}`,
                few: `${translation.few}`,
                many: `${translation.many}`,
              })} / ${numberFormat(sum)} ₽`
            : `${translation.basketToolAction}`}
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
