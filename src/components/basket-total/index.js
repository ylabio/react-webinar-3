import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import { useTranslate } from "../../translate";
import { Link } from "react-router-dom";


function BasketTotal({sum}) {
  const {translate}=useTranslate()
  const cn = bem('BasketTotal');
  return (
    <div className={cn()}>
     <span className={cn('cell')}>{translate('total')}</span>
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
