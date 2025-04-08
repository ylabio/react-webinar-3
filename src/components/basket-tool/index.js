import { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import Cart from '../../assets/icon/cart.svg';
import './style.css';

function BasketTool(props) {
  const { onOpen = () => {}, sum = 0, amount = 0 } = props;

  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <h4 className={cn('subtitle')}>
        <Link to={"/"}>{props.pageLinkText}</Link>
      </h4>
      <button className={cn('action')} onClick={onOpen}>
        <Cart className={cn('icon')} />
        <span className={cn('total')}>
        {amount
            ? `${amount} ${plural(amount, props.pluralForms)} / ${
                numberFormat(sum, undefined, { maximumFractionDigits: 0 })
              } ₽`
            : props.emptyBasketText}
        </span>
      </button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func,
  sum: PropTypes.number,
  amount: PropTypes.number,
  pageLinkText: PropTypes.string.isRequired,
  emptyBasketText: PropTypes.string.isRequired,
  pluralForms: PropTypes.shape({
    one: PropTypes.string.isRequired,
    few: PropTypes.string.isRequired,
    many: PropTypes.string.isRequired
  }).isRequired
};

export default memo(BasketTool);
