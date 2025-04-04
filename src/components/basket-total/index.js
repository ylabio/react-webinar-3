import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';
import useSelector from '../../store/use-selector';
import { translate } from '../../utils';

function BasketTotal({ sum = 0 }) {
  const cn = bem('BasketTotal');
  const lang = useSelector(state => state.language.language);
  const translation = translate[lang];

  return (
    <div className={cn()}>
      <span className={cn('cell')}>{translation.basketTotal}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
};

export default memo(BasketTotal);
