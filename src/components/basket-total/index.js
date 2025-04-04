import { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';
import LanguageContext from '../language-provider';
import cart_empty from '../../assets/icon/cart_empty.png'

function BasketTotal({ sum = 0 }) {
  const cn = bem('BasketTotal');

  const { language, translations } = useContext(LanguageContext);

  if (sum === 0) {
    return (
      <div className="Cart-empty">
        <img src={cart_empty} />
        <b>{translations[language].cartEmpty}</b>
    </div>
    );
  }

  return (
    <div className={cn()}>
      <span className={cn('cell')}>{translations[language].totalInCart}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
};

export default memo(BasketTotal);
