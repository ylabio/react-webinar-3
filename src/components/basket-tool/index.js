import {memo} from "react";
import { NavLink } from 'react-router-dom';
import useSelector from "../../store/use-selector";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';

function BasketTool({sum, amount, onOpen}) {
  const cn = bem('BasketTool');

  const language = useSelector(state => ({
    language: state.language.language,
    headTextRu: {...state.language.ru.head, ...state.language.ru.values},
    headTextEn: {...state.language.en.head, ...state.language.en.values},
  }));

  const text = language.language === "ru" ? language.headTextRu : language.headTextEn;

  return (
    <div className={cn()}>
      <NavLink to='/' relative="path" className={cn('nav')}>{text.navButton}</NavLink>
      <span className={cn('label')}>{text.basketText}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: `${text.basketCurrentOne}`,
            few: `${text.basketCurrentTwo}`,
            many: `${text.basketCurrentMany}`
          })} / ${numberFormat(sum)} ${text.currency}`
          : `${text.basketCurrentEmpty}`
        }
      </span>
      <button onClick={onOpen}>{text.basketButton}</button>
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
