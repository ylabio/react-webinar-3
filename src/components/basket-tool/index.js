import { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import Cart from '../../assets/icon/cart.svg';
import { translations } from '../../utils';
import './style.css';

function BasketTool(props) {
const { onOpen = () => {}, sum = 0, amount = 0, language } = props;
  const cn = bem('BasketTool');
  const listTransfers = translations[language];
  return (
    <div className={cn()}>
      <nav className={cn('nav')}>
        <Link to="/" className={cn('subtitle')}>
          {listTransfers.home}
        </Link>
      </nav>
      <button className={cn('action')} onClick={onOpen}>
        <Cart className={cn('icon')} />
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
                one: listTransfers.itemOne || 'товар',
                few: listTransfers.itemFew || 'товара',
                many: listTransfers.itemMany || 'товаров',
              })} / ${numberFormat(sum)} ₽`
            : listTransfers.empty || 'Пусто'}
        </span>
      </button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  language: PropTypes.string.isRequired,
};

export default memo(BasketTool);
