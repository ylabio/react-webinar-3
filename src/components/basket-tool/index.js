import { memo } from 'react';
import PropTypes, { func } from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import Cart from '../../assets/icon/cart.svg';
import { Link } from 'react-router';
import useSelector from '../../store/use-selector';
import './style.css';

function BasketTool(props) {
  const { onOpen = () => {}, sum = 0, amount = 0 } = props;

  const select = useSelector(state => ({
    language: state.language.lang,
  }));
  const cn = bem('BasketTool');

  function setEmpty() {
    if (select.language === 'ru') {
      return 'пусто';
    }
    return 'empty';
  }

  function setGoods() {
    if (select.language === 'ru') {
      return plural(amount, {
        one: 'товар',
        few: 'товара',
        many: 'товаров',
      });
    }
    return plural(amount, {
      one: 'item',
      few: 'items',
      many: 'items',
    });
  }
  
  return (
    <div className={cn()}>
      <Link to={"/"} className={cn('toMain')}>
        {select.language === 'ru' ? 'Главная' : 'Main'}
      </Link>
      <button className={cn('action')} onClick={onOpen}>
        <img src={Cart} className={cn('icon')}/>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${setGoods()} / ${numberFormat(sum)} ₽`
            : setEmpty()}
        </span>
      </button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

export default memo(BasketTool);
