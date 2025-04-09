import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import Cart from '../../assets/icon/cart.svg';
import './style.css';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useCallback } from 'react';
import text from '../../text';

function BasketTool({ amount, sum, text, openBasket, toNavigate=routes.mainPagePath }) {
  const navigate = useNavigate();

  console.log(text)

  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <a className='main-page-link' onClick={() => { navigate(toNavigate) }}>{text.mainPage}</a>
      <button className={cn('action')} onClick={ openBasket }>
        <Cart className={cn('icon')} />
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
                one: text.oneProduct,
                few: text.fewProducts,
                many: text.manyProducts,
              })} / ${numberFormat(sum)} ₽`
            : text.emptyBasket}
        </span>
      </button>
    </div>
  );
}

BasketTool.propTypes = {
  openBasket: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

export default memo(BasketTool);
