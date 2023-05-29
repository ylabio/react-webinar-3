import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';

const dict = {
  rus: {
    inBasket: 'В Корзине',
    empty: 'Пусто',
    enter: 'Перейти',
    oneProduct: 'товар',
    fewProducts: 'товара',
    manyProducts: 'товаров',
  },
  eng: {
    inBasket: 'In Basket',
    empty: 'Empty',
    oneProduct: 'product',
    fewProducts: 'products',
    manyProducts: 'products',
    enter: 'Enter',
  }
}

function BasketTool({sum, amount, lang, onOpen}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{dict[lang].inBasket}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {one:`${dict[lang].oneProduct}`, few:`${dict[lang].fewProducts}`,
            many:`${dict[lang].manyProducts}`})} / ${numberFormat(sum)} ₽`
          : `${dict[lang].empty}`
        }
      </span>
      <button onClick={onOpen}>{dict[lang].enter}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  lang: PropTypes.oneOf(['rus', 'eng']),
};

BasketTool.defaultProps = {
  sum: 0,
  amount: 0,
  lang: 'rus',
}

export default memo(BasketTool);
