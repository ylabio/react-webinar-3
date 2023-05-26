import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import {useNavigate} from "react-router-dom";

function BasketTool({sum, amount, onOpen}) {
  const cn = bem('BasketTool');
  const navigate = useNavigate();

  return (
    <div className={cn()}>
      <span onClick={() => navigate("/")} className={'homeLink'}>Главная</span>
      <span className={cn('label')}>В корзине:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {one: 'товар', few: 'товара', many: 'товаров'})} / ${numberFormat(sum)} ₽`
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
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {
  },
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
