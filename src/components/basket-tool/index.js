import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import Cart from '../../assets/icon/cart.svg';

import { LANGUAGES } from '../../lang/languages';
import { numberFormat, plural } from '../../utils';

import './style.css';

function BasketTool(props) {
  const { onOpen = () => {}, sum = 0, amount = 0 } = props;
  const pluralData =
    props.lang === 'ru'
      ? {
          one: 'товар',
          few: 'товара',
          many: 'товаров',
        }
      : {
          one: 'product',
          few: 'products',
          many: 'products',
        };
  const cn = bem('BasketTool');
  
  return (
    <div className={cn()}>
      <button className={cn('action')} onClick={onOpen}>
        <Cart className={cn('icon')} />
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, pluralData)} / ${numberFormat(sum)} ₽`
            : `${LANGUAGES[props.lang].empty}`}
        </span>
      </button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  total: PropTypes.string,
  amount: PropTypes.number,
  lang: PropTypes.oneOf(['en', 'ru']),
};

export default memo(BasketTool);
