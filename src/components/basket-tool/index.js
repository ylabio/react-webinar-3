import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';


function BasketTool({sum, amount, onOpen, lang}) {

  const variants = lang === 'ru-RU' ? {one: 'товар', few: 'товара', many: 'товаров'} : {one: 'good', other: 'goods'}


  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{lang === 'ru-RU' ? 'В корзине:' : 'Basket:'}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, variants, lang)} / ${numberFormat(sum)} ₽`
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
  amount: PropTypes.number,
  lang: PropTypes.string,

};

BasketTool.defaultProps = {
  onOpen: () => {
  },
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
