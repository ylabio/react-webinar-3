import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import { Link} from "react-router-dom";
import { langButton, langText, pluralOptions } from "../../constants/language";

function BasketTool(props) {
const {sum, amount, onOpen, path, language='ru'} = props

  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <Link
        to={path}
        className={cn('link')}>{langText.MAIN[language]}
      </Link>
      <span className={cn('label')}>{langText.SHOPPING_CART[language][1]}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, pluralOptions[language])} / ${numberFormat(sum, langText.LANGUAGE[language][1])} ₽`
          : (`${langText.EMPTY[language]}`)
        }
      </span>
      <button onClick={onOpen}>{langButton.OPEN[language]}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  path: PropTypes.string,
  language: PropTypes.string,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  path: '/'
}

export default memo(BasketTool);
