import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';
import useSelector from '../../store/use-selector';
import locales from '../../locales';

function BasketTotal({ sum = 0 }) {
  const select = useSelector(state => ({
      language: state.lang.language
    }));
  const cn = bem('BasketTotal');
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{locales[select.language].total}:</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
};

export default memo(BasketTotal);
