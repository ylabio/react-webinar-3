import {memo} from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';

function BasketTool({sum, amount, onOpen}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
        <Link to='/' className={cn('link')}>Главная</Link>
        <div className={cn('tools')}>
            <span className={cn('label')}>В корзине:</span>
            <span className={cn('total')}>
              {amount
                ? `${amount} ${plural(amount, {
                  one: 'товар',
                  few: 'товара',
                  many: 'товаров'
                })} / ${numberFormat(sum)} ₽`
                : `пусто`
              }
            </span>
            <button onClick={onOpen}>Перейти</button>
        </div>
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
