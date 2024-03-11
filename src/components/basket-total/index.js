import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {useTranslate} from '../../hooks/useTranslate'
import {numberFormat} from "../../utils";
import './style.css';

function BasketTotal({sum}) {
  const cn = bem('BasketTotal');
  const tr = useTranslate()
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{tr('Total')}</span>
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
