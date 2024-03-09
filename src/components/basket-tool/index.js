import {memo} from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import useSelector from "../../store/use-selector";
import { lang } from "../../data/lang";
import './style.css';

function BasketTool({sum, amount, onOpen}) {
  const cn = bem('BasketTool');

  const select = useSelector(state => ({
    lang: state.lang.lang,
  }));

  return (
    <div className={cn()}>
      <Link className={cn('title')} to='/'>{lang[select.lang].main}</Link>
      <span className={cn('label')}>{lang[select.lang].cart}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: lang[select.lang].item.one,
            few: lang[select.lang].item.few,
            many: lang[select.lang].item.many
          })} / ${numberFormat(sum)} ₽`
          : lang[select.lang].empty
        }
      </span>
      <button onClick={onOpen}>{lang[select.lang].proceed}</button>
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
