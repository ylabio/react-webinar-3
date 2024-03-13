import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import {Link} from "react-router-dom";
import {locale} from "../../locale";

function BasketTool({sum, amount, onOpen, lang}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <Link to='/'>{locale[lang].tool.main}</Link>
      <span className={cn('label')}>{locale[lang].tool.inCart}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, locale[lang].goods)} / ${numberFormat(sum)} ₽`
          : locale[lang].tool.empty
        }
      </span>
      <button onClick={onOpen}>{locale[lang].button.go}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  lang: PropTypes.string
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
