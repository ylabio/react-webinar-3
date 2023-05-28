import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';

function BasketTotal({sum, getTranslation, language}) {

  const cn = bem('BasketTotal');
  
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{getTranslation('TOTAL', language)}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
  language: PropTypes.string,
  getTranslation: PropTypes.func
};

BasketTotal.defaultProps = {
  getTranslation: () => {},
  sum: 0
}

export default memo(BasketTotal);
