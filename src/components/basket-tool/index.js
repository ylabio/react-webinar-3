import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';

function BasketTool({translation, sum, amount, onOpen}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{translation.inBasket}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, translation.plural, translation.pluralKey)} / ${numberFormat(sum, translation.pluralKey)} ₽`
          : translation.empty
        }
      </span>
      <button onClick={onOpen}>{translation.basketButton}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  translation: PropTypes.shape({
    pluralKey: PropTypes.string.isRequired,
    plural: PropTypes.oneOfType([
      PropTypes.shape({
        one: PropTypes.string.isRequired, few: PropTypes.string.isRequired, many: PropTypes.string.isRequired
      }).isRequired,
      PropTypes.shape({
        one: PropTypes.string.isRequired,
        two: PropTypes.string.isRequired,
        few: PropTypes.string.isRequired,
        many: PropTypes.string.isRequired,
        other: PropTypes.string.isRequired
      }).isRequired,
    ]),
  }).isRequired,
};

BasketTool.defaultProps = {
  onOpen: () => {
  },
  sum: 0,
  amount: 0,
  translation: {
    homeLink: 'Главная',
    basketButton: 'Перейти',
    inBasket: 'В корзине',
    empty: 'пусто',
    pluralKey: 'ru-RU',
    plural: {one: 'товар', few: 'товара', many: 'товаров'}
  }
}

export default memo(BasketTool);
