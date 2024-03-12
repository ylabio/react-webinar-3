import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import { lang } from "../../data/lang";
import './style.css';

function BasketTool({sum, amount, onOpen, language}) {
  const cn = bem('BasketTool');

  return (
    <div className={cn()}>
      <span className={cn('label')}>{lang[language].cart}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: lang[language].item.one,
            few: lang[language].item.few,
            many: lang[language].item.many
          })} / ${numberFormat(sum)} ₽`
          : lang[language].empty
        }
      </span>
      <button onClick={onOpen}>{lang[language].proceed}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  language: PropTypes.string
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  language: 'ru'
}

export default memo(BasketTool);
