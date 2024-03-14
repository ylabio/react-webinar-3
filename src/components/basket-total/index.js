import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import { languages } from '../../store/language/languages';
import './style.css';

function BasketTotal({sum, lang}) {
  const cn = bem('BasketTotal');
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{languages[lang].total}</span>
      <span className={cn('cell')}> {numberFormat(sum)} {languages[lang].price}</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
  lang: PropTypes.string.isRequired
};

BasketTotal.defaultProps = {
  sum: 0
}

export default memo(BasketTotal);
