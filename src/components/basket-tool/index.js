import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import { Link } from "react-router-dom";
import { langData } from "../../store/language/langData";

function BasketTool({sum, amount, onOpen, language}) {
  const cn = bem('BasketTool');

  const translations = {
    navTitle: langData[language].main,
    inCart: langData[language].inCart,
    one: langData[language].item.one,
    few: langData[language].item.few,
    many: langData[language].item.many,
    empty: langData[language].item.empty,
    goTo: langData[language].buttons.goTo
  }

  return (
    <div className={cn()}>
      <span className={cn('nav')}>
        <Link to="/">{translations.navTitle}</Link>
      </span>
      <span className={cn('label')}>{`${translations.inCart}:`}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: `${translations.one}`,
            few: `${translations.few}`,
            many: `${translations.many}`
          })} / ${numberFormat(sum)} ₽`
          : `${translations.empty}`
        }
      </span>
      <button onClick={onOpen}>{translations.goTo}</button>
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
  amount: 0
}

export default memo(BasketTool);
