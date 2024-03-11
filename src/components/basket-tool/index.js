import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import { Link, useMatch } from "react-router-dom";

function BasketTool({sum, amount, onOpen, changePage}) {

  const cn = bem('BasketTool');
  const path = useMatch('/')

  return (
    <div className={cn()}>
      <Link className={cn('link')} to='/' onClick={path ? () => changePage(1) : () => {}}>Главная</Link>
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
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  changePage: PropTypes.func.isRequired
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  changePage: () => {}
}

export default memo(BasketTool);
