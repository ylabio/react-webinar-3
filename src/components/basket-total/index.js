import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';
import useSelector from '../../store/use-selector';
import { messages } from '../../messages';

function BasketTotal({ sum = 0 }) {
  const select = useSelector(state => ({
            lang: state.inter.lang,
        }));

  const cn = bem('BasketTotal');

  const totalMessage = messages[select.lang].total;

  return (
    <div className={cn()}>
      <span className={cn('cell')}>{totalMessage}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
};

export default memo(BasketTotal);
