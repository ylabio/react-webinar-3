import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import Cart from '../../assets/icon/cart.svg';
import './style.css';
import Menu from '../menu';


function BasketTool(props) {
  const { onOpen = () => {}, sum = 0, amount = 0, isMenu=false, language} = props;

  const cn = bem('BasketTool');
  return (
   
    <div className={cn()}>
      <div>{isMenu && <Menu language={language}/>}</div>
      <button className={cn('action')} onClick={onOpen}>
        <Cart className={cn('icon')} />
        {language === 'ru' &&
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
                one: 'товар',
                few: 'товара',
                many: 'товаров',
              })} / ${numberFormat(sum)} ₽`
            : `пусто`}
        </span>}

        {language === 'en' &&
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
                one: 'product',
                few: 'products',
                many: 'products',
              })} / ${numberFormat(sum)} ₽`
            : `empty`}
        </span>}
      </button>
    </div>

  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  isMenu: PropTypes.bool,
  language: PropTypes.string,
};

export default memo(BasketTool);
