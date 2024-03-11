import {memo, useMemo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';

function BasketTotal({sum, lang}) {

  const cn = bem('BasketTotal');

  const total = useMemo(() => {
    return lang === 'ru'
      ? 'Итого'
      : 'Total'
  }, [lang]);

  return (
    <div className={cn()}>
      <span className={cn('cell')}>{total}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
  lang: PropTypes.string
};

BasketTotal.defaultProps = {
  sum: 0,
  lang: 'ru'
}

export default memo(BasketTotal);
