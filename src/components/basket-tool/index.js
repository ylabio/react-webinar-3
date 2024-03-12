import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import {Link} from "react-router-dom";


function BasketTool({sum, amount, onOpen , lang}) {

  const variants =   lang ===  'ru-RU' ? {one: 'товар', few: 'товара', many: 'товаров'} :{one: 'good', other:'goods'}


  const locale = lang === 'ru' ? 'ru-RU' : 'en-US'
  console.log(locale)

  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <Link to={'/main'}>{lang === 'ru-RU' ? 'Главная' : 'Main'}</Link>
      <span className={cn('label')}>{lang === 'ru-RU' ? 'В корзине:' : 'Basket:'}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount,variants, lang)} / ${numberFormat(sum)} ₽`
          : `${lang === 'ru-RU' ? 'пусто' : 'empty'}`
        }
      </span>
      <button onClick={onOpen}>{lang === 'ru-RU' ? 'Перейти' : 'To basket'}</button>
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
