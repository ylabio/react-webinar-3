import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural, pluralEn} from "../../utils";
import './style.css';
import { Link } from "react-router-dom";
import { useLanguage } from "../../language";

function BasketTool({sum, amount, onOpen}) {
  const cn = bem('BasketTool');
  const { currentLanguage } = useLanguage()
  return (
    <div className={cn()}>
      <span className={cn('home')}>
        <Link to="/">{currentLanguage === 'ru' ? 'Главная' : 'Main'}</Link>
      </span>
      <span className={cn('label')}>{currentLanguage === 'ru' ? 'В корзине:' : 'Cart:'}</span>
      <span className={cn('total')}>
      {
        amount 
          ? currentLanguage === 'ru' 
            ? `${amount} ${plural(amount, {
                          one: 'товар',
                          few: 'товара',
                          many: 'товаров'
              })} / ${numberFormat(sum)} ₽`
            : `${amount} ${pluralEn(amount, {
                          one: 'pc',
                          other: 'pcs'
              })} / ${numberFormat(sum)} RUB`
          : currentLanguage === 'ru'
            ? 'пусто'
            : 'empty'
      }

      </span>
      <button onClick={onOpen}>{currentLanguage === 'ru' ? 'Перейти' : 'To cart'}</button>
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
