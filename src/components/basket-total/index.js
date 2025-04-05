import { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';
import { LanguageContext } from '../../store/context';

function BasketTotal({ sum = 0 }) {
  const { translate, language } = useContext(LanguageContext);
  const cn = bem('BasketTotal');
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{translate('total')}</span>
      <span className={cn('cell')}> {numberFormat(sum, language)} </span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
};

export default memo(BasketTotal);
