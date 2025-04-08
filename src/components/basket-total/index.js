import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import useSelector from '../../store/use-selector';
import './style.css';

function BasketTotal({ sum = 0 }) {
  const select = useSelector(state => ({
    language: state.language.lang,
  }));

  const cn = bem('BasketTotal');
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{select.lang === "ru" ? "Итого" : "In Total"}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
};

export default memo(BasketTotal);
