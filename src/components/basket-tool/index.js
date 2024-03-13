import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import { content } from "../../store/translation/content";


function BasketTool({sum, amount, onOpen, lang}) {
  const cn = bem('BasketTool');

  return (
    <div className={cn()}>
      <span className={cn('label')} >{content[lang].inBasket}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: `${content[lang].order}`,
            few: `${content[lang].fewOrders}`,
            many: `${content[lang].orders}`
          })} / ${numberFormat(sum)} ₽`
          : `${content[lang].empty}`
        }
      </span>
      <button onClick={onOpen}>{content[lang].goTo}</button>
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
  lang: 'ru',
}

export default memo(BasketTool);
