import {memo, useCallback} from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import Cart from '../../assets/icon/cart.svg';
import './style.css';
import { useNavigate } from "react-router-dom";
import useSelector from "../../store/use-selector";

function BasketTool(props) {
  const { onOpen = () => {}, sum = 0, amount = 0, onChangePage = (page) => {}} = props;
  const navigate = useNavigate();
  const lang = useSelector(state => state.language.language);
  const translations = {
    ru: {
      home: 'Главная',
      amount: plural(amount, {
        one: 'товар',
        few: 'товара',
        many: 'товаров',
      }),
      empty: 'Пусто',
    },
    en: {
      home: 'Home',
      amount: plural(amount, {
        one: 'item',
        other: 'items',
      }, 'en-US'),
      empty: 'Empty',
    },
  }


  const callbacks = {
    goToHome: useCallback(() => {
      onChangePage(1);
      navigate('/')
    }, []),
  };

  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <a onClick={callbacks.goToHome} className={cn('home')}>
        {/*{language === 'ru' ? 'Главная' : 'Home'}*/}
        {translations[lang].home}
      </a>
      <button className={cn('action')} onClick={onOpen}>
        <Cart className={cn('icon')} />
        <span className={cn('total')}>
          {amount
            ? `${amount} ${translations[lang].amount} / ${numberFormat(sum)} ₽`
            : translations[lang].empty
          }
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
