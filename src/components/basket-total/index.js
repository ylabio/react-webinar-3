import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';

function BasketTotal({translation, sum}) {
  const cn = bem('BasketTotal');
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{translation.total}</span>
      <span className={cn('cell')}> {numberFormat(sum, translation.pluralKey)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
  translation: PropTypes.shape({
    total: PropTypes.string.isRequired,
    pluralKey: PropTypes.string.isRequired,
  }).isRequired,
};

BasketTotal.defaultProps = {
  sum: 0,
  translation: {
    total: 'Итого',
    pluralKey: 'ru-RU',
  }
}

export default memo(BasketTotal);
