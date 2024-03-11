import {memo, useContext} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import { Link, useMatch } from "react-router-dom";
import { LanguageContext } from "../../languageContext";

function BasketTool({sum, amount, onOpen, changePage}) {

  const [language, setLanguage] = useContext(LanguageContext);

  const cn = bem('BasketTool');
  const path = useMatch('/')

  const text = {
    ru: {
      main: 'Главная',
      basket: 'В корзине',
      item: 'товар',
      goTo: 'Перейти'
    },
    eng: {
      main: 'Main',
      basket: 'In basket',
      item: 'item',
      clear: 'no items',
      goTo: 'Go into basket'
    }
  }

  return (
    <div className={cn()}>
      <Link className={cn('link')} to='/' onClick={path ? () => changePage(1) : () => {}}>{text[language].main}</Link>
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
  changePage: PropTypes.func.isRequired
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  changePage: () => {}
}

export default memo(BasketTool);
