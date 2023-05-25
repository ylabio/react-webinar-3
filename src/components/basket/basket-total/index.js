import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo } from "react";
import useLanguage from "../../../localization/use-language";
import { numberFormat } from "../../../utils";
import './style.css';

function BasketTotal({sum}) {
  const cn = bem('BasketTotal');
  const ln = useLanguage();
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{ln('basketStatsLabel')}</span>
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
