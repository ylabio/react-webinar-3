import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import Cart from '../../assets/icon/cart.svg';
import './style.css';
import { Link } from 'react-router-dom';
import useTranslate from '../../hooks/useTranslate';

function BasketTool(props) {
  const t = useTranslate();
  const { onOpen = () => {}, sum = 0, amount = 0 } = props;

  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <Link to="/" className={cn('nav')}>
        {t.main}
      </Link>
      <button className={cn('action')} onClick={onOpen}>
        <Cart className={cn('icon')} />
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
                one: t.one,
                few: t.few,
                many: t.many,
              })} / ${numberFormat(sum)} ₽`
            : t.Empty}
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
