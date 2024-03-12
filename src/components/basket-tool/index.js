import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import {Link} from "react-router-dom";
import { content } from "../../store/translation/content";


function BasketTool({sum, amount, onOpen, lang, paginate}) {
  const cn = bem('BasketTool');

  return (
    <div className={cn()}>
      <Link to={"/"} className={cn('home')} onClick={() => {paginate(1)}}>{content[lang].main}</Link>
      {/* <a href='/' className={cn('home')}>Главная</a> */}
      <span className={cn('label')} >{content[lang].inBasket}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: `${content[lang].order}`,
            few: `${content[lang].fewOrders}`,
            many: `${content[lang].orders}`
          })} / ${numberFormat(sum)} ₽`
          : `${content[lang].empty}`
        }
      </span>
      <button onClick={onOpen}>{content[lang].goTo}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  lang: PropTypes.string,
  paginate: PropTypes.func.isRequired
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  lang: 'ru',
  paginate: () => {},
}

export default memo(BasketTool);
