import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import {Link} from "react-router-dom";

function BasketTool({sum, amount}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <Link to={`/`} className={cn('main')}>Главная</Link>
      <span className={cn('label')}>В корзине:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {one:'товар', few:'товара', many:'товаров'})} / ${numberFormat(sum)} ₽`
          : `пусто`
        }
      </span>
      <Link to={`/basket`} className={cn('button')}>Перейти</Link>
      {/*<button onClick={onOpen}>Перейти</button>*/}
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
