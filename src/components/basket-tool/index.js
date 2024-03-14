import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import Menu from "../menu";
import { languages } from '../../store/language/languages';
import './style.css';

function BasketTool({sum, amount, onOpen, lang}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <Menu link={languages[lang].link}/>
      <span className={cn('label')}>{languages[lang].cart}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${lang === 'ru' ? plural(amount, {
            one: 'товар',
            few: 'товара',
            many: 'товаров'
          }) : plural(amount, {
            one: 'good',
            other: 'goods',
          }, 'en-EN')} / ${numberFormat(sum)} ${languages[lang].price}`
          : languages[lang].empty
        }
      </span>
      <button onClick={onOpen}>{languages[lang].go}</button>
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
  amount: 0,
  lang: 'ru'
}

export default memo(BasketTool);
