import {memo,useContext} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import { LanguageContext } from "../../languages/languagesContext";

function BasketTotal({sum}) {
  const cn = bem('BasketTotal');

  let { dict } = useContext(LanguageContext)

  return (
    <div className={cn()}>
      <span className={cn('cell')}>{dict.total}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number
};

BasketTotal.defaultProps = {
  sum: 0
}

export default memo(BasketTotal);
