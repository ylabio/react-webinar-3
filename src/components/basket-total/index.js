import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo } from 'react';
import useSelector from '../../store/use-selector';
import { numberFormat } from '../../utils';
import { translations } from '../../utils/translations';
import './style.css';

function BasketTotal({ sum = 0 }) {
  const cn = bem('BasketTotal');
  const lang = useSelector(state => state.language.currentLanguage);
  const t = translations[lang] || translations.ru;
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{t.total}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
};

export default memo(BasketTotal);
