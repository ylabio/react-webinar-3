import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from '../../utils';
import useTranslate from '../../hooks/useTranslate';
import './style.css';

function Detail({desc, price, madeInCountry, madeInCode, category, year, onAdd}) {
  const _ = useTranslate();
  const cn = bem('Detail');
  return (
    <div className={cn()}>
      <p className={cn('desc')}>{desc}</p>
      <p className={cn('desc')}>{_('countryName')}: 
        <b>{madeInCountry} ({madeInCode})</b>
      </p>
      <p className={cn('desc')}>{_('category')}: 
        <b>{category}</b>
      </p>
      <p className={cn('desc')}>{_('year')}: 
        <b>{year}</b>
      </p>
      <p className={cn('price')}>{_('price')}: {numberFormat(price)} ₽</p>
      <button onClick={onAdd}>{_('addAction')}</button>
    </div>
  );
}

Detail.propTypes = {
  onAdd: PropTypes.func.isRequired,
  desc: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  madeInCountry: PropTypes.string.isRequired,
  madeInCode: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired
};

export default memo(Detail);
