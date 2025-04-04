import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';
import useSelector from "../../store/use-selector";

function BasketTotal({ sum = 0 }) {
  const lang = useSelector(state => state.language.language);
  const translations = {
    ru: {
      total: 'Итого',
    },
    en: {
      total: 'Total',
    }
  }

  const cn = bem('BasketTotal');
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{translations[lang].total}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
};

export default memo(BasketTotal);
