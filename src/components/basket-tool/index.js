import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import {locale} from "../../locale";

function BasketTool({sum, amount, onOpen, lang, children}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <div className={cn('children')}>
        {children}
      </div>
      <div className={cn('self')}>
        <span className={cn('label')}>{locale[lang].tool.inCart}:</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, locale[lang].goods)} / ${numberFormat(sum)} ₽`
            : locale[lang].tool.empty
          }
        </span>
        <button onClick={onOpen}>{locale[lang].button.go}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  children: PropTypes.node,
  lang: PropTypes.string
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
