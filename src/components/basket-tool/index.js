import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import { Link } from 'react-router';
import Cart from '../../assets/icon/cart.svg';
import { useAppContext } from '../../app-context';
import { STRINGS } from '../../const';
import './style.css';

function BasketTool(props) {
  const { onOpen = () => {}, sum = 0, amount = 0 } = props;
  const { language } = useAppContext();
  const cn = bem('BasketTool');

  return (
    <nav className={cn()}>
      <div className={cn('container')}>
        <Link to={`/page/1`} className={cn('link')}>{props.home}</Link>
        <button className={cn('action')} onClick={onOpen}>
          <Cart className={cn('icon')} />
          <span className={cn('total')}>
            {amount
              ? `${amount} ${plural(amount, props.products, props.language)} / ${numberFormat(sum)} ₽`
              : `${props.empty}`}
          </span>
        </button>
      </div>
    </nav>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

export default memo(BasketTool);
