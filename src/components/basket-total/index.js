import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import { useLanguage } from "../../language";

function BasketTotal({sum}) {
  const cn = bem('BasketTotal');
  const {currentLanguage} = useLanguage()

  return (
    <div className={cn()}>
      <span className={cn('cell')}>{currentLanguage === 'ru' ? 'Итого' : 'Final'}</span>
      <span className={cn('cell')}> {numberFormat(sum)} {currentLanguage === 'ru' ? '₽' : 'RUB'}</span>
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
