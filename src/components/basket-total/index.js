import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';
import { langKeyWords } from '../../utils/lang';

function BasketTotal({ sum = 0, lang = 'ru' }) {
  const cn = bem('BasketTotal');
  const multi = langKeyWords[lang] || langKeyWords.ru;

  return (
    <div className={cn()}>
      <span className={cn('cell')}>{multi.total}</span>
      <span className={cn('cell')}> {numberFormat(sum, lang)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
  lang: PropTypes.string,
};

export default memo(BasketTotal);
