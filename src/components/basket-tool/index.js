import {memo, useContext} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import { LanguageContext } from "../../languageContext";
import jsonText from './text.json'

function BasketTool({sum, amount, onOpen}) {

  const [language, setLanguage] = useContext(LanguageContext);

  const cn = bem('BasketTool');

  const text = jsonText;

  return (
    <div className={cn()}>
      <span className={cn('label')}>{text[language].basket}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: text[language].item,
            few: text[language].item + (language == 'ru' ? 'a' : 's'),
            many: text[language].item + (language == 'ru' ? 'ов' : 's')
          })} / ${numberFormat(sum)} ₽`
          : text[language].clear
        }
      </span>
      <button onClick={onOpen}>{text[language].goTo}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
}

export default memo(BasketTool);
