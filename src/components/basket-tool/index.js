import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';

function BasketTool({sum, amount, onOpen, lang}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <div>
        <span className={cn('label') + ' lng-inCart'}>В корзине:</span>
        <span className={cn('total') + ' lng-amount'}>
          {amount
            ? `${amount} ${plural(amount, {
              one: `${lang === 'ru' ? 'товар' : 'article'}`,
              few: 'товара',
              many: 'товаров',
              other: 'articles'
            }, lang === 'en' && lang + '-US')} / ${numberFormat(sum)} ₽`
            : lang === 'ru' ? `пусто` : 'empty'
          }
        </span>
        <button onClick={onOpen} className='lng-goOver'>Перейти</button>
      </div>
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
  onOpen: () => {},
  sum: 0,
  amount: 0,
  lang: 'ru'
}

export default memo(BasketTool);
