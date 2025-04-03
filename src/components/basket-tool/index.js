import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import Cart from '../../assets/icon/cart.svg';
import { NavLink } from 'react-router';
import './style.css';

function BasketTool({ onOpen = () => {}, sum = 0, amount = 0, localText }) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <NavLink className={cn('link')} to={'/'}>
        {localText.mainPage}
      </NavLink>
      <button className={cn('action')} onClick={onOpen}>
        <Cart className={cn('icon')} />
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
                one: localText.plural.one,
                few: localText.plural.few,
                many: localText.plural.many,
              })} / ${numberFormat(sum)} ₽`
            : localText.empty}
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
