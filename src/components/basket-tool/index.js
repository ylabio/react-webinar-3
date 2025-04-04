import {memo, useCallback} from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import Cart from '../../assets/icon/cart.svg';
import './style.css';
import { useNavigate } from "react-router-dom";

function BasketTool(props) {
  const { onOpen = () => {}, sum = 0, amount = 0, onChangePage = (page) => {}} = props;
  const navigate = useNavigate();

  const callbacks = {
    goToHome: useCallback(() => {
      onChangePage(1);
      navigate('/')
    }, []),
  };

  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <a onClick={callbacks.goToHome} className={cn('home')}>Главная</a>
      <button className={cn('action')} onClick={onOpen}>
        <Cart className={cn('icon')} />
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
                one: 'товар',
                few: 'товара',
                many: 'товаров',
              })} / ${numberFormat(sum)} ₽`
            : `Пусто`}
        </span>
      </button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  onChangePage: PropTypes.func,
};

export default memo(BasketTool);
