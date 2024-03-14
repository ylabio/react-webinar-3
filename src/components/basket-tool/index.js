import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import { Link } from "react-router-dom";
import { locale } from "../../locale";

function BasketTool({sum, amount, onOpen, lang}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('basket')}>
        <span className={cn('label')}>{locale[lang].basketTool.inBasket}</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
              one: locale[lang].basketTool.pluralGoods.one,
              few: locale[lang].basketTool.pluralGoods.few,
              many: locale[lang].basketTool.pluralGoods.many
            })} / ${numberFormat(sum)} ₽`
            : locale[lang].basketTool.empty
          }
        </span>
        <button onClick={onOpen}>{locale[lang].basketTool.toBasket}</button>
      </span>
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
  amount: 0
}

export default memo(BasketTool);
