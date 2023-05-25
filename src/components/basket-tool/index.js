import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import {Link} from "react-router-dom";

function BasketTool({sum, amount, onOpen, getRoutePath, mainLinkTitle, inBasketTitle, goToBasketTitle, emptyBasketTitle}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <Link to={getRoutePath('main')} className={cn('main-link')}>{mainLinkTitle}</Link>
      <span className={cn('label')}>{inBasketTitle}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {one: 'товар', few: 'товара', many: 'товаров'})} / ${numberFormat(sum)} ₽`
          : emptyBasketTitle
        }
      </span>
      <button onClick={onOpen}>{goToBasketTitle}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  getRoutePath: PropTypes.func,
  mainLinkTitle: PropTypes.string.isRequired,
  inBasketTitle: PropTypes.string.isRequired,
  goToBasketTitle: PropTypes.string.isRequired,
  emptyBasketTitle: PropTypes.string.isRequired,
};

BasketTool.defaultProps = {
  onOpen: () => {
  },
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
