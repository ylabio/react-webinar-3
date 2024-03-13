import {memo, useContext} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import {LanguageContext} from "../../language-provider.js";

function BasketTool({sum, amount, onOpen}) {
  const cn = bem('BasketTool');

  const { wordsTranslate } = useContext(LanguageContext);

  return (
    <div className={cn()}>
      <span className={cn('label')}>{wordsTranslate("inBasket")}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: 'товар',
            few: 'товара',
            many: 'товаров'
          })} / ${numberFormat(sum)} ₽`
          : <>{wordsTranslate("empty")}</>
        }
      </span>
      <button onClick={onOpen}>{wordsTranslate("move")}</button>
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
