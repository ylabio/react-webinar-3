<<<<<<< HEAD
import {memo, useContext} from "react";
=======
import {memo} from "react";
>>>>>>> 965c1b144a06904160cffca15056d32ecb80f433
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
<<<<<<< HEAD
import {useLanguage} from "../../language-provider";

function BasketTotal({sum}) {
  const { t } = useLanguage()
  const cn = bem('BasketTotal');
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{t('total')}</span>
=======

function BasketTotal({sum}) {
  const cn = bem('BasketTotal');
  return (
    <div className={cn()}>
      <span className={cn('cell')}>Итого</span>
>>>>>>> 965c1b144a06904160cffca15056d32ecb80f433
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number
};

BasketTotal.defaultProps = {
  sum: 0
}

export default memo(BasketTotal);
